// build script, using node

// Goal: build Definition.xml of each pencil collection
// 
// Source folders:
//   src/
//     +- icons/ : icons used for shape collections. max. 90x90 pixels
//     +- includes/: 
//     |    +- functions/: common JavaScript functions which can be used in shape definitions.
//     |    +- shapes/: shape definitions (XML + SVG + JS)
//     |    +- Prpoerties.xml: Common shape properties for a collection 
//     +- lib/: further common JavaScript lilbraries
//     +- Definition.<Collection>.xml  One definition file for each collection with placeholders and includes
//
// Build folders:
//   build/
//     +- <Collection>/ build folder, one for each collection
//           +- icons/ : icons needed for this collection
//           +- Definition.xml  The definition of the collection, contains all shape definitions and JavaScript files
//
//  placeholders in src/Definition.<Collection>.xml
//    two types of files have to be included in the Definition.xml: XML (Shapes definitions and properties) and JavaScript files.
//    XML file placeholder: <!-- include {PLACEHOLDER} --> (to be used when in XML mode)
//      Example:    <!-- include includes/Properties.xml -->
//                  <!-- include includes/shapes/BDAgent_V001.xml -->
//                  <!-- include lib/underscore-min.js -->
//    JavaScript file placeholder: /* includeJS {PLACEHOLDER} */ (to be used when in JavaScript mode)
//      Note: 
//        - The files are not just included, but processed by require() - this only seems to delete the "module.exports = <Name>;" line
//        - This is really an in-line include
//      Example:    collection.calculateHorVertLinePoints  = /* includeJS includes/functions/calculateHorVertLinePoints.js */;
//
// Build process:
// 1. Determine collections by listing src/Definition.*.xml and extract collection names
// 2. For each collection name:
//    a. determine build dir, for example build/TAM_BD
//    b. check whether build dir exists, else create it. Same for subdir icons/
//    c. read src/Definition.<Collection>.xml
//    d. process the XML includes, determine include file and replace include statement with file content
//    e. process the JavaScript includes, determine include file and replace include statement with file content
//    f. save build/<Collection>/Definition.xml
//    g. copy src/icons to build/<Collection>/icons


var fse = require("fs-extra");
var fs = require("fs");
const S_DEFINITIONS_DIR = "src";
const S_BUILD_DIR = "build";
const S_FILE_INCLUDE_TEMPLATE = "<!-- include {PLACEHOLDER} -->";
const S_JSFILE_INCLUDE_TEMPLATE = "/* includeJS {PLACEHOLDER} */";

function readFileContent (sFile) {
    return fse.readFileSync(sFile, "utf8");
}

function readIncludesFunctions (sBaseDir, aJSFileNames) {
    return aJSFileNames.map(sJSFileName => require(`./${sBaseDir}/${sJSFileName}`).toString());
}

function saveFileContent (sFileName, sFileContent) {
    fse.writeFileSync(sFileName, sFileContent, { encoding: "utf8" });
}

function readLinesContaining(reMatch, sFile) {
    return readFileContent(sFile)
        .split(/\r?\n/)
        .filter(function (sLine) {
            return reMatch.test(sLine);
        })
        .map(x => x.match(reMatch)[1] || x);
}

function readIncludesContent (sBaseDir, aFilesToRead) {
    return aFilesToRead.map((sFile) => {
        return fse.readFileSync(sBaseDir + "/" + sFile, "utf8");
    });
}

function replaceIncludes (sIncludeTemplate, sFile, aIncludeNames, aIncludesContent) {
    var sFileReplaced = sFile;
    aIncludeNames
        .map(sIncludeName => sIncludeTemplate.replace("{PLACEHOLDER}", () => sIncludeName))
        .forEach(function (sReplaceableString, iIdx) {
            var sIncludeContent = aIncludesContent[iIdx];
            sFileReplaced = sFileReplaced.replace(sReplaceableString, () => sIncludeContent);
        });

    return sFileReplaced;
}

function readCollectionList (sBaseDir) {
  // find collection Definitions using the schema Definition.NAME.xml
  // and return an array with items [Definition.NAME.xml, NAME]
  var aCollections = [];
  var aDirContent = fs.readdirSync(sBaseDir);

  aDirContent.forEach(filename => {
    if (filename.includes('Definition.')) {
      if (fs.statSync(sBaseDir + '/' + filename).isFile()) {
        var words = filename.split('.');
        if (words[1] != 'xml') {
          console.log("found Collection " + filename);
          aCollections.push([filename, words[1]]);
        }
      }
    }
  })
  return aCollections;
} // readCollectionList

function processCollection (sCollDef, sCollName = '') {
  console.log("process Collection " + sCollDef + ' ('+ sCollName + ')');
  if (sCollName.length > 0)
  {
    var s_definition_file_build_dir = S_BUILD_DIR + '/' + sCollName;
    if (!fs.existsSync(s_definition_file_build_dir)) {
      // Target directory doesn't exist: Create it now
      fs.mkdirSync(s_definition_file_build_dir);
      fs.mkdirSync(s_definition_file_build_dir + '/icons');
      console.log("mkdir " + s_definition_file_build_dir);
    }
  } else {
    var s_definition_file_build_dir = S_BUILD_DIR
  }

  var sDefinitionFile      = S_DEFINITIONS_DIR + '/' + sCollDef;
  var sDefinitionFileBuild = s_definition_file_build_dir + '/Definition.xml';
  var aIncludes = readLinesContaining(/<!-- include\s(.+)\s-->/, sDefinitionFile);
  var aIncludesContent = readIncludesContent(S_DEFINITIONS_DIR, aIncludes);

  var sDefinitions = readFileContent(sDefinitionFile);
  var sDefinitionsReplaced = replaceIncludes(S_FILE_INCLUDE_TEMPLATE, sDefinitions, aIncludes, aIncludesContent);

  var aIncludesJS = readLinesContaining(/\/\* includeJS\s([^\s]+)\s\*\//, sDefinitionFile);
  var aIncludesJSContent = readIncludesFunctions(S_DEFINITIONS_DIR, aIncludesJS);

  var sDefinitionsReplacedWithJS = replaceIncludes(S_JSFILE_INCLUDE_TEMPLATE, sDefinitionsReplaced, aIncludesJS, aIncludesJSContent);

  saveFileContent(sDefinitionFileBuild, sDefinitionsReplacedWithJS);

  fse.copy(S_DEFINITIONS_DIR + "/icons", s_definition_file_build_dir + "/icons")
      .then(() => console.log(new Date() + " " + sCollName + ': Build success!'))
      .catch(err => console.error(err));

} // processCollection


var aCollections = readCollectionList(S_DEFINITIONS_DIR);
if (aCollections.length > 0) {
  aCollections.forEach(aCollection => {
    processCollection(aCollection[0], aCollection[1]);
  });
} else
{
  processCollection('Definition.xml');
}
