// describe('Minify', async () => {
//   const path = require('path');
//   const fs = require('fs-extra');
//   const { promisify } = require('util');
//   const { expect } = require('chai');

//   const { isDir } = require('../../lib/IsDir');
//   const exists = promisify(fs.exists);

//   const { getMetadata, clearFiles, copyFiles } = require('../helpers');
//   const minify = require('../../minify');

//   // let inputPath;
//   // let outputPath;

//   let inputPath = path.resolve('./input') + path.sep;
//   let outputPath = path.resolve('./output');

//   if (!(isDir(inputPath) && isDir(outputPath))) {
//     throw new Error('Input and/or Output folders do not exist');
//   }

//   beforeEach(async function() {
//     await clearFiles(inputPath);
//     await clearFiles(outputPath);
//     await copyFiles(path.resolve('./test_input'), inputPath);
//   });

//   it('Images should be minified and be smaller file size', async function() {
//     this.timeout(30000);

//     const beforeMetadata = await getMetadata(inputPath);

//     await minify(inputPath, outputPath);

//     const afterMetadata = await getMetadata(outputPath);

//     for (const image in afterMetadata) {
//       const difference = afterMetadata[image].size - beforeMetadata[image].size;
//       expect(difference).to.be.lessThan(0);
//     }
//   });
// });
