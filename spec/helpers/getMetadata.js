const fs = require('fs');
const path = require('path');

async function getMetadata(files) {
    let metadata = {}
    let getMetadataPromises = []
    for (let i = 0; i < files.length; i++) {
        getMetadataPromises.push(
            (async () => {
                const imageBuffer = fs.readFileSync(outputPath + path.sep + files[i]);
                const metadata = await sharp(imageBuffer).metadata();
                // metadata.push(metadata);
                metadata[files[i]] = {}
                for (const key in metadata) {
                    if (metadata.hasOwnProperty(key)) {
                        // const element = object[key];
                        metadata[files[i]][key] = metadata[key]
                    }
                }
            })()
        )
    }
    await Promise.all(getMetadataPromises)
    return metadata;
}

module.exports = {
    getMetadata,
}