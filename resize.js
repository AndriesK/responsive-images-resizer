const path = require('path');
const createResolutionFolders = require('./lib/createResolutionFolders');
const sharp = require('sharp');

class workImage {
  constructor(image, sizes) {
    this.image = image;
    this.sizes = sizes;
    this.extension = image.substring(image.lastIndexOf('.'));
    this.writePath = path.join(image, '..');

    createResolutionFolders(path.join(image, '..'), sizes);
  }

  getOutputName(size) {
    return this.image + size;
  }

  getImageName(size) {
    return (
      path.basename(this.image, path.extname(this.image)) +
      '-' +
      size.toString() +
      path.extname(this.image)
    );

    // return imageNameWithSize;
  }

  getWritePath(size) {
    return this.writePath + path.sep + size + path.sep;
  }

  async workImages() {
    for (let i = 0; i < this.sizes.length; i++) {
      await this.workImage(this.sizes[i]);
    }
    return true;
  }

  workImage(size) {
    // console.log('Image name', this.getImageName(size));

    return new Promise((resolve, reject) => {
      sharp(this.image)
        .resize(parseInt(size, 10))
        .toFile(
          this.getWritePath(size) + this.getImageName(size),
          (err, info) => {
            if (err) {
              reject(err);
            } else {
              resolve(info);
            }
          }
        );
    });
  }
}

async function resize(absoluteNameArray, sizeArray) {
  let promDone = 0;
  console.log('4444');
  return await new Promise((resolve, reject) => {
    if (typeof absoluteNameArray === 'string') {
      reject(
        'Please pass in all images mapped with paths instead of a directory!'
      );
    }
    console.log('dfffff');
    for (let i = 0; i < absoluteNameArray.length; i++) {
      console.log('yeee');
      const work = new workImage(absoluteNameArray[i], sizeArray);
      work
        .workImages()
        .then(success => {
          promDone = promDone + 1;
          if (promDone === absoluteNameArray.length) {
            resolve(true);
          }
        })
        .catch(err => {
          reject(err);
        });
    }
  });
}

module.exports = resize;
