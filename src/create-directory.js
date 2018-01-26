const fs = require('fs-extra');

function createDirectory(directory) {
  if (!fs.existsSync(directory)) {
    fs.ensureDirSync(directory);
    console.log(`created ${directory}`);
  }
}

module.exports = createDirectory;
