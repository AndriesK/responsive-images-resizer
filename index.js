const resize = require('./resize');
const minify = require('./minify');
const fs = require('fs');
const isDir = require('./lib/IsDir');

function minifyAndResize(inputFolder, outputFolder, sizeArray, options) {
    sizeArray.map((res) => {
        if (typeof res === 'string') {
            return res;
        } else {
            return res.toString();
        }
    })
    minify(inputFolder, outputFolder, options).then(() => {
        const IMAGE_PATH_AND_NAMES = fs.readdirSync(outputFolder);
        let imagePaths = [];
        for (let i = 0; i < IMAGE_PATH_AND_NAMES.length; i++) {
            imagePaths.push(outputFolder + "/" + IMAGE_PATH_AND_NAMES[i]);
        }
        resize(imagePaths, sizeArray).then(() => {
                const redundantFiles = fs.readdirSync(outputFolder);
                for (let j = 0; j < redundantFiles.length; j++) {
                    if (!isDir(outputFolder + "/" + redundantFiles[j])) {
                        fs.unlinkSync(outputFolder + "/" + redundantFiles[j]);
                    }
                }

            })
            .catch((err) => {
                return new Error(err)
            });
    }).catch((err) => {
        return new Error(err);
    })
}

module.exports = minifyAndResize;
