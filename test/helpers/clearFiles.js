const fs = require('fs-extra');
const path = require('path');

const { promisify } = require("util");

const readdir = promisify(fs.readdir);

const remove = promisify(fs.remove);

async function clearFiles(directory) {
    return new Promise(async (resolve, reject) => {
        let files = await readdir(directory);
        let deletePromises = []
        for (let i = 0; i < files.length; i++) {
            deletePromises.push(await remove(directory + path.sep + files[i]));
        }
        try {
            await Promise.all(deletePromises);
        } catch (e) {
            reject(e)
        }
        resolve()
    });
}

module.exports = {
    clearFiles,
}