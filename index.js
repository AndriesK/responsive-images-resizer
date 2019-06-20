const resize = require("./resize");
const minify = require("./minify");
const fs = require("fs");
const isDir = require("./lib/IsDir");

function minifyAndResize(inputFolder, outputFolder, sizeArray, options) {
    return new Promise((resolve, reject) => {
        sizeArray.map(res => {
            if (typeof res === "string") {
                return res;
            } else {
                return res.toString();
            }
        });
        minify(
                inputFolder,
                outputFolder,
                (options = {
                    allowedFormats: ["jpg", "jpeg", "png", "webp"]
                })
            )
            .then(() => {
                let IMAGE_PATH_AND_NAMES = fs.readdirSync(outputFolder);
                let imagePaths = [];
                const ALLOWED_FORMATS = options.allowedFormats;
                if (
                    ALLOWED_FORMATS.indexOf("jpg") > -1 &&
                    ALLOWED_FORMATS.indexOf("jpeg") < 0
                ) {
                    ALLOWED_FORMATS.push("jpeg");
                } else if (
                    ALLOWED_FORMATS.indexOf("jpeg") > -1 &&
                    ALLOWED_FORMATS.indexOf("jpg") < 0
                ) {
                    ALLOWED_FORMATS.push("jpg");
                }
                let regExpString = "(";
                for (let i = 0; i < ALLOWED_FORMATS.length; i++) {
                    if (ALLOWED_FORMATS[i][0] !== ".") {
                        ALLOWED_FORMATS[i] = "." + ALLOWED_FORMATS[i];
                    }
                    if (i !== ALLOWED_FORMATS.length - 1) {
                        regExpString += `\\${ALLOWED_FORMATS[i]}|`;
                    } else {
                        regExpString += `\\${ALLOWED_FORMATS[i]}`;
                    }
                }
                regExpString += ")$";
                const IS_IMAGE_REGEXP = new RegExp(regExpString, "i");
                IMAGE_PATH_AND_NAMES = IMAGE_PATH_AND_NAMES.filter(name => {
                    return IS_IMAGE_REGEXP.test(name);
                });
                for (let i = 0; i < IMAGE_PATH_AND_NAMES.length; i++) {
                    imagePaths.push(
                        outputFolder + "/" + IMAGE_PATH_AND_NAMES[i]
                    );
                }
                resize(imagePaths, sizeArray)
                    .then(() => {
                        const redundantFiles = fs.readdirSync(outputFolder);
                        for (let j = 0; j < redundantFiles.length; j++) {
                            if (
                                !isDir(
                                    outputFolder + "/" + redundantFiles[j]
                                ) &&
                                IMAGE_PATH_AND_NAMES.indexOf(
                                    redundantFiles[j]
                                ) > -1
                            ) {
                                fs.unlinkSync(
                                    outputFolder + "/" + redundantFiles[j]
                                );
                            }
                        }
                        resolve(true);
                    })
                    .catch(err => {
                        const redundantFiles = fs.readdirSync(outputFolder);
                        const resFolders = redundantFiles.filter(folder => sizeArray.indexOf(folder) > -1);

                        for (let j = 0; j < redundantFiles.length; j++) {
                            if (!isDir(outputFolder + "/" + redundantFiles[j]) && IMAGE_PATH_AND_NAMES.indexOf(redundantFiles[j]) > -1) {
                                fs.unlinkSync(outputFolder + "/" + redundantFiles[j]);
                            } else if (isDir(outputFolder + "/" + redundantFiles[j]) &&
                                resFolders.indexOf(redundantFiles[j]) > -1
                            ) {
                                fs.rmdirSync(outputFolder + "/" + redundantFiles[j])
                            }
                        }
                        reject(err);
                        return new Error(err);
                    });
            })
            .catch(err => {
                reject(err);
                return new Error(err);
            });
    });
}

minifyAndResize("./images", "./build", [
        "144",
        "360",
        "720",
        "1080",
        "1440",
        "1920"
    ])
    .then(() => {
        console.log("success");
    })
    .catch(err => {
        console.log("Err:", err);
    });

module.exports = minifyAndResize;
