const fs = require("fs");
const path = require("path");
const S_DISTRIBUTION_DIR = "dist";
const S_BUILD_DIR = "build";

fs.mkdirSync(S_DISTRIBUTION_DIR, { recursive: true} );
fs.readdirSync(S_BUILD_DIR, { withFileTypes: true}).forEach((entry) => {
    if (path.extname(entry.name).toLowerCase() === ".zip") {
        let sourcePath = path.join(S_BUILD_DIR, entry.name);
        let destPath = path.join(S_DISTRIBUTION_DIR, entry.name);
        fs.copyFileSync(sourcePath, destPath);    
    }
});
