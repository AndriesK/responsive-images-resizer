const fs = require('fs');
const path = require('path');

async function copyFiles(srcDirectory, destDirectory) {
    let files = await fs.readdir(directory);
    return new Promise(async (resolve, reject) => {
        let copyPromises = []
        for (let i = 0; i < inputs.length; i++) {
            copyPromises.push(await fs.copyFile(directory + path.sep + files[i], destDirectory));
        }
        try {
            await Promise.all(copyPromises);
        } catch (e) {
            reject(e)
        }
        resolve()
    });
}

module.exports = {
    copyFiles,
}