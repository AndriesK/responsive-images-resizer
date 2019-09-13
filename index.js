const resize = require('./resize');
const minify = require('./minify');
const fs = require('fs');
const isDir = require('./lib/IsDir');
const fileBusy = require('./lib/fileBusy');
const getJustImages = require('./lib/getJustImages');

function minifyAndResize(inputFolder, outputFolder, sizeArray, options) {
    return new Promise((resolve, reject) => {
        sizeArray.map((res) => {
            if (typeof res === 'string') {
                return res;
            } else {
                return res.toString();
            }
        });
        minify(
                inputFolder,
                outputFolder,
                (options = {
                    allowedFormats: ['jpg', 'jpeg', 'png', 'webp', "JPEG", "JPG", "WEBP", "PNG"],
                    chunkSize: 8,
                }),
            )
            .then((minifyReturn) => {
                let IMAGE_PATH_AND_NAMES = fs.readdirSync(outputFolder);
                let imagePaths = [];
                const ALLOWED_FORMATS = options.allowedFormats;
                if (ALLOWED_FORMATS.indexOf('jpg') > -1 && ALLOWED_FORMATS.indexOf('jpeg') < 0) {
                    ALLOWED_FORMATS.push('jpeg');
                } else if (ALLOWED_FORMATS.indexOf('jpeg') > -1 && ALLOWED_FORMATS.indexOf('jpg') < 0) {
                    ALLOWED_FORMATS.push('jpg');
                }
                IMAGE_PATH_AND_NAMES = getJustImages(IMAGE_PATH_AND_NAMES, ALLOWED_FORMATS);
                for (let i = 0; i < IMAGE_PATH_AND_NAMES.length; i++) {
                    imagePaths.push(outputFolder + '/' + IMAGE_PATH_AND_NAMES[i]);
                }
                resize(imagePaths, sizeArray)
                    .then(() => {
                        const redundantFiles = fs.readdirSync(outputFolder);
                        for (let j = 0; j < redundantFiles.length; j++) {
                            if (!isDir(outputFolder + '/' + redundantFiles[j]) && IMAGE_PATH_AND_NAMES.indexOf(redundantFiles[j]) > -1) {
                                console.log('monkaW', outputFolder + '/' + redundantFiles[j]);
                                fileBusy(outputFolder + '/' + redundantFiles[j])
                                    .then(() => {
                                        console.log('DIS DONE!', outputFolder + '/' + redundantFiles[j]);
                                        resolve(true);
                                    })
                                    .catch((err) => {
                                        console.log('error forsenMald', err);
                                        return reject(err);
                                    })

                            }
                        }
                    })
                    .catch((err) => {
                        reject(err);
                        return new Error(err);
                    });
            })
            .catch((err) => {
                reject(err);
                return new Error(err);
            });
    });
}

module.exports = minifyAndResize;
