// describe("Minify", function () {
//     const minify = require('../../minify');
//     const sharp = require('sharp');
//     const fs = require('fs-extra');
//     const path = require('path');
//     const { promisify } = require("util");
//     const readFile = promisify(fs.readFile);


//     console.log('1');

//     let outputPath = path.normalize(path.join(__dirname, "../../", "output/"));

//     console.log('2');

//     const inputPath = path.normalize(path.join(__dirname, "../../", "images/"));

//     let beforeMinifyImagesMetadata = [];

//     let afterMinifyImagesMetadata = []

//     const files = fs.readdirSync(outputPath);
//     let filesToMinify = fs.readdirSync(inputPath);


//     filesToMinify = filesToMinify.filter((input) => {
//         return /.+(\.jpe?g|\.png|\.webp)$/gi.test(input)
//     })

//     beforeEach(async () => {
//         console.log("OUTPUT PATHz", outputPath);
//         for (let i = 0; i < files.length; i++) {
//             const filepath = outputPath + files[i];

//             if (filesToMinify.indexOf(files[i]) > -1) {
//                 fs.removeSync(filepath)
//             }

//         }

//         // Minify input folder and store in output folder

//         let beforeMinifyPromises = [];
//         for (let i = 0; i < filesToMinify.length; i++) {
//             beforeMinifyPromises.push(
//                 (async () => {
//                     const imageBuffer = fs.readFileSync(inputPath + filesToMinify[i]);

//                     let imageMetadata = await sharp(imageBuffer).metadata();

//                     beforeMinifyImagesMetadata.push(imageMetadata);
//                 })()

//             )
//         }
//         await Promise.all(beforeMinifyPromises);


//         await minify(inputPath, outputPath);

//         let filesMinified = fs.readdirSync(outputPath);

//         filesMinified = filesMinified.filter((output) => {
//             return filesToMinify.indexOf(output) > -1;
//         })

//         filesMinified = filesMinified.map((file) => {
//             return outputPath + file
//         })

//         let afterMinifyPromises = [];
//         for (let i = 0; i < filesMinified.length; i++) {
//             afterMinifyPromises.push(
//                 (async () => {
//                     const imageBuffer = fs.readFileSync(filesMinified[i]);
//                     const metadata = await sharp(imageBuffer).metadata();
//                     afterMinifyImagesMetadata.push(metadata);
//                 })()
//             )
//         }
//         await Promise.all(afterMinifyPromises);


//     });

//     // it("should be stored in output directory", () => {
//     //     let itFiles = [...files];

//     //     itFiles = files.filter((file) => {
//     //         return filesToMinify.indexOf(file) > -1;
//     //     });

//     //     expect(files.length).toEqual(filesToMinify.length);
//     // });

//     // it("should be smaller file size", async () => {
//     //     for (let i = 0; i < afterMinifyImagesMetadata.length; i++) {
//     //         expect(afterMinifyImagesMetadata[i].size).toBeLessThanOrEqual(beforeMinifyImagesMetadata[i].size + 10000, "Image size should be less or in a 10000 KB range")
//     //     }
//     // });

//     let filesToMinifyCopy = filesToMinify;

//     filesToMinify = filesToMinify.filter((input) => {
//         return /.+(\.jpe?g)$/gi.test(input)
//     });


//     // console.log("OUTPUT PATH", outputPath);

//     let outputPathCopy = outputPath;

//     console.log("Path delimiter", path.delimiter);

//     outputPath = outputPath + "format-test" + path.sep;


//     console.log("OUTPUT PATH 1", outputPath);


//     it("should only work on given image format", async () => {
//         console.log("FILEZZZZZ", files);
//     });

//     outputPath = outputPathCopy;

//     filesToMinify = filesToMinifyCopy;



//     // for (let i = 0; i < 20; i++) {
//     //     it("files should not be locked after minification", async () => {

//     //     });
//     // }

// });
