const fs = require('fs');
const isDir = require('./IsDir');
const fileBusy = require('./fileBusy');
const getJustImages = require('./getJustImages');

function splitFiles(folder, chunkSize, allowedFormats) {
  /*
    Splits the provided folder of images into chunks to be handled one by one
    Returns 2D array of multiple files;
  */
  if (folder.length > chunkSize) {
    const filesArray = []
    for (let i = 0; i < Math.ceil(folder.length / chunkSize); i++) {
      filesArray.push(folder.slice(i * chunkSize, i * chunkSize + chunkSize))
    }
    return filesArray.map((chunk, index) => {
      const rtnVal = getJustImages(chunk, allowedFormats);
      if (rtnVal.length > 0) {
        return rtnVal;
      }
    })
  } else {
    return [folder];
  }
}

module.exports = splitFiles;
