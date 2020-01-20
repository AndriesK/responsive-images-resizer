// describe('Resize', async () => {
//   const path = require('path');
//   const fs = require('fs-extra');
//   const { promisify } = require('util');
//   const { expect } = require('chai');

//   const { getMetadata, clearFiles, copyFiles } = require('../helpers');
//   const { isDir } = require('../../lib/IsDir');
//   const resize = require('../../resize');

//   let inputPath = path.resolve('./input') + path.sep;
//   let outputPath = path.resolve('./output');

//   const readdir = promisify(fs.readdir);

//   if (!(isDir(inputPath) && isDir(outputPath))) {
//     throw new Error('Input and/or Output folders do not exist');
//   }

//   beforeEach(async function() {
//     await clearFiles(inputPath);
//     await clearFiles(outputPath);
//     await copyFiles(path.resolve('./test_input'), inputPath);
//   });

//   it('Images should be resized to all appropriate resolutions', async function() {
//     this.timeout(30000);

//     let imagesToResize = await readdir(inputPath);

//     imagesToResize = imagesToResize.map(image => {
//       return inputPath + image;
//     });

//     await resize(imagesToResize, [1920, 1440, 1080, 720, 480, 360, 144]);

//     let resolutionFolders = await readdir(inputPath);

//     resolutionFolders = resolutionFolders.filter(file => {
//       return isDir(path.resolve(inputPath + file));
//     });

//     for (folder of resolutionFolders) {
//       const imagesMetadataResolution = await getMetadata(inputPath + folder);

//       for (const image in imagesMetadataResolution) {
//         const width = imagesMetadataResolution[image].width;
//         expect(width).to.be.equal(parseInt(folder, 10));
//       }
//     }
//   });
// });
