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
        const imageName = this.image.substring(this.image.lastIndexOf('/') + 1, this.image.length);
        const extension = imageName.substring(imageName.lastIndexOf('.'));
        const withoutExtension = imageName.substring(0, imageName.lastIndexOf('.'));
        const imageNameWithSize = withoutExtension + "-" + size.toString() + extension;
        return imageNameWithSize;
    }

    getWritePath(size) {
        return this.writePath + "\\" + size + "\\";
    }

    async workImages() {
        for (let i = 0; i < this.sizes.length; i++) {
            await this.workImage(this.sizes[i]);
        }
        return true;
    }

    workImage(size) {
        return new Promise((resolve, reject) => {
            sharp(this.image)
                .resize(parseInt(size, 10))
                .toFile(this.getWritePath(size) + this.getImageName(size), (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(info);
                    }
                });
        })
    }
}

async function resize(absoluteNameArray, sizeArray) {
    let promDone = 0;
    await new Promise((resolve, reject) => {
        for (let i = 0; i < absoluteNameArray.length; i++) {
            const work = new workImage(
                absoluteNameArray[i],
                sizeArray
            );
            work.workImages().then((success) => {
                promDone = promDone + 1;
                if (promDone === absoluteNameArray.length) {
                    resolve(true);
                }
            }).catch((err) => {
                reject(err);
            })
        }
    })
}

module.exports = resize;
