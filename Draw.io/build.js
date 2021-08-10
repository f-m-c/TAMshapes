/*
build script, using node
Goal: build library file for each pencil collection

Folders:
  src/
    +-*.library  contains filenames of shapes (one line each)
    +- shapes/   shape definitions: .shape, .xml, and .stencil
  build/         deployable draw.io libraries

.shape files: contain a JSON object with a file link for XML: e.g. "xmlfile":"BD-Agent.xml","w":120,"h":60,"aspect":"fixed","title":"Agent" 
              The property "xmlfile" will be replaced by the compressed content as property "xml"
.xml files:   contain the actual mxGraph description of a shape, e.g. <mxGraphModel><root><mxCell id="0" />...
              Some reference a stencil in an mxCell definition, e.g. <mxCell id="2" value="" style="shape=stencil(filename=BD-modAccessVert.stencil);..."              
.stencil files: special shape markup, e.g. <shape h="20" w="20" aspect="fixed" strokewidth="inherit"> <background> ...


Further infos:
* Shape XML:   https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxGeometry-js.html#mxGeometry
* Stencil XML: https://jgraph.github.io/mxgraph/docs/js-api/files/shape/mxStencil-js.html
*/
var fs = require("fs");
var path = require('path');
var pako = require('pako'); // see https://www.npmjs.com/package/pako

const S_DEFINITIONS_DIR = path.join(__dirname, "src") ;
const S_BUILD_DIR = path.join( __dirname, "build");


function readFileContent (sFile) {
    return fs.readFileSync(sFile, "utf8");
}

function saveFileContent (sFileName, sFileContent) {
    fs.writeFileSync(sFileName, sFileContent, { encoding: "utf8" });
}

function readLinesContaining(reMatch, sFile) {
    return readFileContent(sFile)
        .split(/\r?\n/)
        .filter(function (sLine) {
            return reMatch.test(sLine);
        })
        .map(x => x.match(reMatch)[1] || x);
}

function mxLibraryEntryXML(contents) {
  return Buffer.from(
    pako.deflateRaw(encodeURIComponent(contents))
  ).toString("base64")
  
}

// see also:https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxGeometry-js.html#mxGeometry
function readShapes (sBaseDir, aFilesToRead) {
  return aFilesToRead.map((sFile) => {
      // read .shape file - a JSON
      var shapeFile = path.join(sBaseDir, sFile);
      var shape = JSON.parse(fs.readFileSync(path.join(sBaseDir, sFile), "utf8"));
      // property xmlfile points to the file with the shape XML code: read it
      var shapeXML = fs.readFileSync(path.join(path.dirname(shapeFile) , shape.xmlfile), "utf8");
      // check whether shape XML contains "shape=stencil(filename=xyz)"
      var reMatch = /shape=stencil\(filename=([^)]+)\)/
      var aStencilFiles = shapeXML.split(/\r?\n/).filter(function (sLine) {
          return reMatch.test(sLine);
        }).map(x => x.match(reMatch)[1] || x);
      // if so, read file content, compress it, and replace "filename=xyz" with compressed content    
      if (aStencilFiles.length > 0){
        aStencilFiles.forEach(function(sStencilFile){
          var shapeStencil = fs.readFileSync(path.join(path.dirname(shapeFile) , sStencilFile), "utf8");
          var shapeStencilCompressed = mxLibraryEntryXML(shapeStencil);
          shapeXML = shapeXML.replace("filename="+sStencilFile, shapeStencilCompressed);
        })
      }
      console.log("   + " + sFile + " (" + shape.xmlfile + ")" );
      // remove property xmlfile and replace it by property xml with encoded shape XML
      delete shape.xmlfile
      return Object.assign({
          xml: mxLibraryEntryXML(shapeXML),
        }, shape);      
  });
}


function readCollectionList (sBaseDir) {
    // find collection Definitions using the schema NAME.library
    // and return an array with items [NAME.library, NAME]
    var aCollections = [];
    var aDirContent = fs.readdirSync(sBaseDir);
  
    aDirContent.forEach(filename => {
      if (filename.includes('.library')) {
        if (fs.statSync(path.join(sBaseDir, filename)).isFile()) {
          var words = filename.split('.');
          aCollections.push([filename, words[0]]);
          
        }
      }
    })
    return aCollections;
  } // readCollectionList

  function mxLibraryXML(entries) {
    return ["<mxlibrary>", JSON.stringify(entries), "</mxlibrary>"].join("");
  }
  
  
  // possible options: w (width), h (height), aspect (fixed/variable), title (stencil title)
  function mxLibraryEntry(contents, options) {
    return Object.assign({
      xml: mxLibraryEntryXML(contents),
    }, options);
  }


  function processCollection(sCollDef, sCollName = '') {
    console.log("process Collection " + sCollDef + ' ('+ sCollName + ')');

    var s_definition_file_build_dir = S_BUILD_DIR

    createBuildDir(S_BUILD_DIR);
  
    var sDefinitionFile      = path.join(S_DEFINITIONS_DIR, sCollDef);
    var sDefinitionFileBuild = path.join(s_definition_file_build_dir, sCollName + '.xml');
    // .library file contains one shape per line, e.g. shapes/BD-Agent.shape
    var aShapes = fs.readFileSync(sDefinitionFile, "utf8").split(/\r?\n/); 
    // .shape files contain a JSON object with a placeholder for XML: e.g. "xmlfile":"BD-Agent.xml","w":120,"h":60,"aspect":"fixed","title":"Agent"
    var aShapesContent = readShapes(S_DEFINITIONS_DIR, aShapes); 
    var sLibrary = mxLibraryXML(aShapesContent);

  
    saveFileContent(sDefinitionFileBuild, sLibrary);

  } // processCollection

  /**
   * Creates a specified directory if not exist.
   * @param {String} s_definition_file_build_dir The specified directory
   */
  function createBuildDir(s_definition_file_build_dir) {
    if (!fs.existsSync(s_definition_file_build_dir)){
        fs.mkdirSync(s_definition_file_build_dir);
    }
  }
  
var aCollections = readCollectionList(S_DEFINITIONS_DIR);
if (aCollections.length > 0) {
  aCollections.forEach(aCollection => {
    processCollection(aCollection[0], aCollection[1]);
  });
}