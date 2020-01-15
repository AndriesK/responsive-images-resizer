describe("Minify", () => {
    const minify = require('../../minify');
    const sharp = require('sharp');
    const fs = require('fs-extra');
    const path = require('path');
    const { promisify } = require("util");
    const readFile = promisify(fs.readFile);

    const { getMetadata, clearFiles, copyFiles } = require('../helpers');

    let inputPath = path.resolve("./input");
    let outputPath = path.resolve("./output");

    let inputs = fs.readdirSync("./input");
    let outputs = fs.readdirSync("./output");
    let formats = ["jpeg", "png"];

    beforeEach(async () => {
        console.log("yeee 2");
        // return new Promise(async (resolve, reject) => {
        //     let deletePromises = []
        //     for (let i = 0; i < inputs.length; i++) {
        //         deletePromises.push(await fs.remove(inputPath + inputs[i]));
        //     }
        //     try {
        //         await Promise.all(deletePromises);
        //     } catch (e) {
        //         reject(e)
        //     }
        //     resolve()
        // });
        await clearFiles(inputPath);
        await clearFiles(outputPath);
        await copyFiles(path.resolve("./test_input"), inputPath);
    });


    it("Images should be smaller file size", async () => {

        console.log("yeee");

        const beforeMetadata = await getMetadata(inputPath);

        await minify(inputPath, outputPath);
        // let afterMinifyPromises = [];
        // let afterMinifyImagesMetadata = {};
        // for (let i = 0; i < outputs.length; i++) {
        //     afterMinifyPromises.push(
        //         (async () => {
        //             const imageBuffer = fs.readFileSync(outputPath + path.sep + outputs[i]);
        //             const metadata = await sharp(imageBuffer).metadata();
        //             // afterMinifyImagesMetadata.push(metadata);
        //             afterMinifyImagesMetadata[outputs[i]] = {}
        //             for (const key in metadata) {
        //                 if (metadata.hasOwnProperty(key)) {
        //                     // const element = object[key];
        //                     afterMinifyImagesMetadata[outputs[i]][key] = metadata[key]
        //                 }
        //             }
        //         })()
        //     )
        // }
        // await Promise.all(afterMinifyPromises);

        const afterMetadata = await getMetadata(outputPath);

        for (const image in afterMetadata) {
            if (afterMetadata.hasOwnProperty(image)) {
                expect(afterMetadata.size).toBeLessThanOrEqual(beforeMetadata.size + 10000, "Image size should be less or in a 10000 KB range")
            }
        }

        // for (let i = 0; i < afterMinifyImagesMetadata.length; i++) {
        //     expect(afterMinifyImagesMetadata.size).toBeLessThanOrEqual(beforeMinifyImagesMetadata[i].size + 10000, "Image size should be less or in a 10000 KB range")
        // }
    })

    it("Input should still be intact", async () => {

    })

    it("Output should minify only given formats", async () => {
        input = inputs.filter((file) => {
            return /.+(\.jpe?g)$/gi.test(file)
        })
    });



});
