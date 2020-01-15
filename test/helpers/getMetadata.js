const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const { promisify } = require("util");

const readdir = promisify(fs.readdir);

async function getMetadata(directory) {
    let getMetadataPromises = []

    const files = await readdir(directory);

    let metadatas = {}

    for (let i = 0; i < files.length; i++) {
        getMetadataPromises.push(
            (async () => {
                const imageBuffer = fs.readFileSync(directory + path.sep + files[i]);
                const metadata = await sharp(imageBuffer).metadata();
                metadatas[files[i]] = metadata;
                return metadata;
            })()
        )
    }

    await Promise.all(getMetadataPromises)

    return metadatas;
}

module.exports = {
    getMetadata,
}