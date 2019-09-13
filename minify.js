const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
const isDir = require('./lib/IsDir');
const fileBusy = require('./lib/fileBusy');
const splitFiles = require('./lib/splitFiles');

async function minify(inputFolder, outputFolder) {
    return await imagemin([inputFolder], {
        destination: outputFolder,
        plugins: [
            imageminMozjpeg(),
            imageminPngquant({
                quality: [0.7, 0.9],
                speed: 1,
                floyd: 1
            })
        ]
    });
}

function execute(inputFolder, outputFolder, options = {
    allowedFormats: ['jpg', 'png', 'webp', 'jpeg', "JPEG", "JPG", "WEBP", "PNG"],
    chunkSize: 8,
}) {
    const FORMATS_MINIFY = options.allowedFormats.join(",");
    const TEMP_NAME = 'responsive-images-resizer-minify-temp';
    if (isDir(inputFolder)) {
        try {
            const files = fs.readdirSync(inputFolder);
            const chunkMax = options.chunkSize;
            const MINIFY_REGEXP = inputFolder + `/*.{${FORMATS_MINIFY}}`;
            try {
                const chunks = splitFiles(files, chunkMax, options.allowedFormats);
                let linearLength = 0;
                for (let p = 0; p < chunks.length; p++) {
                    for (let o = 0; o < chunks[p].length; o++) {
                        linearLength++;
                    }
                }
                return new Promise((resolve, reject) => {
                    let nameArray = [];
                    let loopIter = 0;
                    for (let i = 0; i < chunks.length; i++) {
                        fs.mkdir(inputFolder + `/${TEMP_NAME}-${i}`, (mkdirErr) => {
                            if (!mkdirErr) {
                                nameArray.push(inputFolder + `/${TEMP_NAME}-${i}`);
                                for (let j = 0; j < chunks[i].length; j++) {
                                    fs.readFile(`${inputFolder}/${chunks[i][j]}`, (readErr, data) => {
                                        if (!readErr) {
                                            try {
                                                fs.writeFileSync(inputFolder + `/${TEMP_NAME}-${i}/${chunks[i][j]}`, data)
                                                loopIter++;
                                                if (loopIter === linearLength) {
                                                    resolve(nameArray);
                                                }
                                            } catch (writeErr) {
                                                console.log('Write Error', writeErr);
                                            }

                                            /* (writeErr) => {
                                                loopIter++;
                                                if (writeErr) {
                                                    reject(writeErr);
                                                }
                                                console.log(`loopiter: ${loopIter}, chunks.length: ${linearLength}`);
                                                if (loopIter === linearLength) {
                                                    resolve(nameArray);
                                                } */
                                            // fs.writeFile(inputFolder + `/${TEMP_NAME}-${i}/${chunks[i][j]}`, data, (writeErr) => {
                                            //     loopIter++;
                                            //     if (writeErr) {
                                            //         reject(writeErr);
                                            //     }
                                            //     console.log(`loopiter: ${loopIter}, chunks.length: ${linearLength}`);
                                            //     if (loopIter === linearLength) {
                                            //         resolve(nameArray);
                                            //     }
                                            /*                                             }); */
                                        } else {
                                            reject(readErr);
                                        }
                                    });
                                }
                            } else {
                                reject(mkdirErr);
                            }
                        })
                    }
                }).then((names) => {
                    let doneIter = 0;
                    return Promise.all(names.map((name, i) => {
                        const MINIFY_REGEXP = name + `/*.{${FORMATS_MINIFY}}`;
                        return minify(MINIFY_REGEXP, outputFolder);
                    }));
                }).catch((promErr) => {
                    throw promErr;
                })
            } catch (err) {
                throw err;
            }
        } catch (err) {
            throw err;
        }
    }
    // return minify(MINIFY_REGEXP, outputFolder)
}

module.exports = execute;
