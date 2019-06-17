const resize = require('./resize');
const minify = require('./minify');
const fs = require('fs');
const path = require('path');
const isDir = require('./lib/IsDir');

function minifyAndResize(inputFolder, outputFolder, sizeArray, options) {
    sizeArray.map((res) => {
        if (typeof res === 'string') {
            return res;
        } else {
            return res.toString();
        }
    })
    minify(inputFolder, outputFolder, options = {
        allowedFormats: ['jpg', 'jpeg', 'png', 'webp']
    }).then(() => {
        console.log('checkpoint 0');
        let IMAGE_PATH_AND_NAMES = fs.readdirSync(outputFolder);
        let imagePaths = [];
        const ALLOWED_FORMATS = options.allowedFormats;
        console.log('checkpoint 1');
        if (ALLOWED_FORMATS.indexOf('jpg') > -1 && ALLOWED_FORMATS.indexOf('jpeg') < 0) {
            ALLOWED_FORMATS.push('jpeg');
        } else if (ALLOWED_FORMATS.indexOf('jpeg') > -1 && ALLOWED_FORMATS.indexOf('jpg') < 0) {
            ALLOWED_FORMATS.push('jpg');
        }
        console.log('checkpoint 2');
        let regExpString = "(";
        for (let i = 0; i < ALLOWED_FORMATS.length; i++) {
            if (ALLOWED_FORMATS[i][0] !== '.') {
                ALLOWED_FORMATS[i] = '.' + ALLOWED_FORMATS[i];
            }
            if (i !== ALLOWED_FORMATS.length - 1) {
                regExpString += `\\${ALLOWED_FORMATS[i]}|`;
            } else {
                regExpString += `\\${ALLOWED_FORMATS[i]}`;
            }
        }
        console.log('checkpoint 3');
        regExpString += ")$";
        const IS_IMAGE_REGEXP = new RegExp(regExpString, "i");
        console.log('IMAGE_PATH_AND_NAMES', IMAGE_PATH_AND_NAMES);
        IMAGE_PATH_AND_NAMES = IMAGE_PATH_AND_NAMES.filter((name) => {
            console.log('NAME', name, IS_IMAGE_REGEXP.test(name));
            return IS_IMAGE_REGEXP.test(name)
        });
        console.log('IMAGE_PATH_AND_NAMES', IMAGE_PATH_AND_NAMES);
        for (let i = 0; i < IMAGE_PATH_AND_NAMES.length; i++) {
            // console.log(`IMAGE_PATH_AND_NAMES[${i}]`, IMAGE_PATH_AND_NAMES[i]);
            // if (IS_IMAGE_REGEXP.test(IMAGE_PATH_AND_NAMES[i])) {
            imagePaths.push(outputFolder + "/" + IMAGE_PATH_AND_NAMES[i]);
            // }
        }
        console.log('IMAGE PATHS:', imagePaths);
        resize(imagePaths, sizeArray).then(() => {
                console.log('Resize done...');
                const redundantFiles = fs.readdirSync(outputFolder);
                console.log('before delete redundant files', redundantFiles);
                for (let j = 0; j < redundantFiles.length; j++) {
                    // console.log('J', j)
                    console.log('delete redundant files:', redundantFiles[j]);
                    console.log('WAIT:', IMAGE_PATH_AND_NAMES.indexOf(redundantFiles[j]) > -1);
                    if (!isDir(outputFolder + "/" + redundantFiles[j]) && IMAGE_PATH_AND_NAMES.indexOf(redundantFiles[j]) > -1) {
                        console.log('redundant file not dir and is in input image list, deleting...');
                        fs.unlinkSync(outputFolder + "/" + redundantFiles[j]);
                    }
                }

            })
            .catch((err) => {
                console.log('Err:', err);
                return new Error(err)
            });
    }).catch((err) => {
        return new Error(err);
    })
}

minifyAndResize('./images', './build', ['144', '720', '1440']);

module.exports = minifyAndResize;
