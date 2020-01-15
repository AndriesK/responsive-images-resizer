const fs = require('fs');
const path = require('path');

const { promisify } = require("util");

const readdir = promisify(fs.readdir);

const copyFile = promisify(fs.copyFile);

async function copyFiles(srcDirectory, destDirectory) {
    return new Promise(async (resolve, reject) => {
        let files = await readdir(srcDirectory);
        let copyPromises = []
        for (let i = 0; i < files.length; i++) {
            copyPromises.push(await copyFile(srcDirectory + path.sep + files[i], destDirectory + path.sep + files[i]));
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