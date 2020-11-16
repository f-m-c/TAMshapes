#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# build script, using python

# Goal: build Definition.xml of each pencil collection
# 
# Source folders:
#   src/
#     +- icons/ : icons used for shape collections. max. 90x90 pixels
#     +- includes/: 
#     |    +- functions/: common JavaScript functions which can be used in shape definitions.
#     |    +- shapes/: shape definitions (XML + SVG + JS)
#     |    +- Prpoerties.xml: Common shape properties for a collection 
#     +- lib/: further common JavaScript lilbraries
#     +- Definition.<Collection>.xml  One definition file for each collection with placeholders and includes
#
# Build folders:
#   build/
#     +- <Collection>/ build folder, one for each collection
#           +- icons/ : icons needed for this collection
#           +- Definition.xml  The definition of the collection, contains all shape definitions and JavaScript files
#
#  placeholders in src/Definition.<Collection>.xml
#    two types of files have to be included in the Definition.xml: XML (Shapes definitions and properties) and JavaScript files.
#    XML file placeholder: <!-- include {PLACEHOLDER} --> (to be used when in XML mode)
#      Example:    <!-- include includes/Properties.xml -->
#                  <!-- include includes/shapes/BDAgent_V001.xml -->
#                  <!-- include lib/underscore-min.js -->
#    JavaScript file placeholder: /* includeJS {PLACEHOLDER} */ (to be used when in JavaScript mode)
#      Note: 
#        - The files are not just included, but processed by require() - this only seems to delete the "module.exports = <Name>;" line
#        - This is really an in-line include
#      Example:    collection.calculateHorVertLinePoints  = /* includeJS includes/functions/calculateHorVertLinePoints.js */;
#
# Build process:
# 1. Determine collections by listing src/Definition.*.xml and extract collection names
# 2. For each collection name:
#    a. determine build dir, for example build/TAM_BD
#    b. check whether build dir exists, else create it. Same for subdir icons/
#    c. read src/Definition.<Collection>.xml
#    d. process the XML includes, determine include file and replace include statement with file content
#    e. process the JavaScript includes, determine include file and replace include statement with file content
#    f. save build/<Collection>/Definition.xml
#    g. copy src/icons to build/<Collection>/icons

import os
import re
import glob
import shutil
import argparse

parser = argparse.ArgumentParser(description="build pencil collections from includes")
parser.add_argument("-v", "--verbose", help="Show more info", action="store_true")
parser.add_argument("--nobuild", help="Don't build Definition.xml", action="store_true")
parser.add_argument("--noicons", help="Don't copy icons", action="store_true")
parser.add_argument("--nozip", help="Don't create collection zip archives", action="store_true")
args = parser.parse_args()

S_DEBUG=args.verbose
S_NOBUILD=args.nobuild
S_NOICONS=args.noicons
S_NOZIP=args.nozip

S_DEFINITIONS_DIR = "src"
S_BUILD_DIR = "build"
S_DEFINITIONS_BUILD_FILENAME = "Definition.xml"
S_DEFINITIONS_SRC_FILENAME_GLOB = "Definition.*.xml"
S_DEFINITIONS_SRC_FILENAME_RE = "Definition\.([^.]+)\.xml"
S_FILE_INCLUDE_RE = "<!-- include ([^ ]+) -->"
S_JSFILE_INCLUDE_RE = "/\* includeJS ([^ ]+) \*/"
S_JSFILE_MODEXP_RE = "module\.exports = ([^;]+);"
S_ICON_RE = 'icon=\"(icons/[^\"]+)\"'
S_ICONS_DIR = "icons"

def replace_includes(s_definitionFileName, s_baseDir):
    s_result = ""
    with open (os.path.join(s_baseDir, s_definitionFileName), "r", encoding="utf-8") as defFileHandler:
        if S_DEBUG:
            print(">> open " + os.path.join(s_baseDir, s_definitionFileName))
        for s_defLine in defFileHandler:
            erg = re.search(S_FILE_INCLUDE_RE, s_defLine)
            if erg:
                s_includeFileName = erg.group(1)
                if S_DEBUG:
                    print(">>> found XML include " + s_includeFileName)
                with open(os.path.join(s_baseDir, s_includeFileName), "r", encoding="utf-8") as includeFileHandler:
                    if S_DEBUG:
                        print(">>>> append content of " + os.path.join(s_baseDir, s_includeFileName))
                    s_result += includeFileHandler.read()                
            else:
                erg2 = re.search(S_JSFILE_INCLUDE_RE, s_defLine)
                if erg2:
                    s_includeFileName = erg2.group(1)
                    if S_DEBUG:
                        print(">>> found JS include " + s_includeFileName)
                    s_jsinclude = ""
                    with open(os.path.join(s_baseDir, s_includeFileName), "r", encoding="utf-8") as includeFileHandler:
                        if S_DEBUG:
                            print(">>>> insert content of " + os.path.join(s_baseDir, s_includeFileName))
                        for s_incLine in includeFileHandler:
                            s_jsinclude += re.sub(S_JSFILE_MODEXP_RE,"",s_incLine)
                    s_result += re.sub(S_JSFILE_INCLUDE_RE, s_jsinclude, s_defLine)
                            
                else:
                    s_result += s_defLine
    return s_result
    

a_definitions = glob.glob(os.path.join(S_DEFINITIONS_DIR, S_DEFINITIONS_SRC_FILENAME_GLOB))
if S_DEBUG:
    print("found ", len(a_definitions), "definition files: ")
for s_definitionFilePath in a_definitions:
    erg = re.search(S_DEFINITIONS_SRC_FILENAME_RE,s_definitionFilePath)
    if erg:
        s_collectionName = erg.group(1)
        s_collectionFileName = erg.group(0)
        if S_DEBUG:
            print("---------------------------------------------------------")
            print("> Collection ", s_collectionName, " in definition file ", s_collectionFileName)
            print("---------------------------------------------------------")
        # check whether build directory already exists
        if not os.path.isdir(os.path.join(S_BUILD_DIR, s_collectionName)):
            if S_DEBUG:
                print(">> Create new build directory ", os.path.join(S_BUILD_DIR, s_collectionName))
            try:
                os.mkdir(os.path.join(S_BUILD_DIR, s_collectionName))
            except OSError as e:
                print ("Error: %s - %s." % (e.filename, e.strerror))
        if not os.path.isdir(os.path.join(S_BUILD_DIR, s_collectionName, S_ICONS_DIR)):
            if S_DEBUG:
                print(">> Create new  icons build directory ", os.path.join(S_BUILD_DIR, s_collectionName, S_ICONS_DIR))
            try:
                os.mkdir(os.path.join(S_BUILD_DIR, s_collectionName, S_ICONS_DIR))
            except OSError as e:
                print ("Error: %s - %s." % (e.filename, e.strerror))

        
        # parse source includes and build content of Definition.xml
        s_buildDefFile = replace_includes(s_collectionFileName, S_DEFINITIONS_DIR)

        # Now write Definition.xml (except --nobuild)
        if not S_NOBUILD:
            with open(os.path.join(S_BUILD_DIR, s_collectionName, S_DEFINITIONS_BUILD_FILENAME), "w", encoding="utf-8") as buildDefFileHandler:
                if S_DEBUG:
                    print(">>> Write Collection content to ", os.path.join(S_BUILD_DIR, s_collectionName, S_DEFINITIONS_BUILD_FILENAME))
                buildDefFileHandler.write(s_buildDefFile)

        # get needed icons, copy them to icons dir in build (except --noicons)
        if not S_NOICONS:
            a_icons = list(dict.fromkeys(re.findall(S_ICON_RE, s_buildDefFile )))
            if S_DEBUG:
                print(">> Found ", len(a_icons), " icon references in ", os.path.join(S_BUILD_DIR, s_collectionName, S_DEFINITIONS_BUILD_FILENAME))
            if len(a_icons) > 0:
                # empty icons dir S_BUILD_DIR + "/" + s_collectionName + "/icons"
                if S_DEBUG:
                    print(">> Delete files from Icons directory ", os.path.join(S_BUILD_DIR, s_collectionName, S_ICONS_DIR))
                a_icon_existingfiles = glob.glob(os.path.join(S_BUILD_DIR , s_collectionName, S_ICONS_DIR, "*"))
                try:
                    for s_icon_file in a_icon_existingfiles:
                        os.remove(s_icon_file)
                except OSError as e:
                    print ("Error: %s - %s." % (e.filename, e.strerror))
            if S_DEBUG:
                print(">> Copy ", len(a_icons), " Icons from ", os.path.join(S_DEFINITIONS_DIR, S_ICONS_DIR) , " to ", os.path.join(S_BUILD_DIR, s_collectionName, S_ICONS_DIR))
            for s_iconfile in a_icons:
                # now copy from S_DEFINITIONS_DIR + "/" + s_iconfile to S_BUILD_DIR + "/" + s_collectionName + "/" + s_iconfile
                if S_DEBUG:
                    print(">>> Copy ", os.path.join(S_DEFINITIONS_DIR, s_iconfile), " to ", os.path.join(S_BUILD_DIR, s_collectionName, S_ICONS_DIR))
                shutil.copy2( os.path.join(S_DEFINITIONS_DIR, s_iconfile), os.path.join(S_BUILD_DIR, s_collectionName, S_ICONS_DIR) )

        # Finally create the zip archive for this collection (except --nozip)
        if not S_NOZIP: 
            if S_DEBUG:
                print(">> Create zip archive ", s_collectionName,'zip', " from ", os.path.join(S_BUILD_DIR, s_collectionName))
            shutil.make_archive(s_collectionName,'zip', os.path.join(S_BUILD_DIR, s_collectionName))
            if S_DEBUG:
                print(">> move zip archive ", s_collectionName,'zip', " to ", S_BUILD_DIR)
            if os.path.isfile(os.path.join(S_BUILD_DIR, s_collectionName +'.zip')):
                os.remove(os.path.join(S_BUILD_DIR, s_collectionName +'.zip'))
            shutil.move(s_collectionName +'.zip', S_BUILD_DIR)

