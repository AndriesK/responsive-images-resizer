const fs = require('fs');

function createResolutionFolders(folder, sizes) {
    sizes.forEach((element, index) => {
        if (!fs.existsSync(folder + "/" + sizes[index])) {
            fs.mkdirSync(folder + "/" + sizes[index]);
        }
    });
}

module.exports = createResolutionFolders;
