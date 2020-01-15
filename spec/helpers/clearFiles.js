const fs = require('fs');
const path = require('path');

async function clearFiles(directory) {
    let files = await fs.readdir(directory);
    return new Promise(async (resolve, reject) => {
        let deletePromises = []
        for (let i = 0; i < inputs.length; i++) {
            deletePromises.push(await fs.remove(directory + path.sep + files[i]));
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