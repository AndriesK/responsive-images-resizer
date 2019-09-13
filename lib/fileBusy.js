const fs = require('fs');

async function del(filePath) {
    return await new Promise((resolve, reject) => {
        fs.open(filePath, 'r+', (openErr, fd) => {
            if (openErr && openErr.code === 'EBUSY') {
                return reject(openErr);
            } else if (openErr && openErr.code === 'ENOENT') {
                return reject(openErr);
            } else {
                fs.close(fd, (closeErr) => {
                    if (!closeErr) {
                        fs.unlink(filePath, (unlinkErr) => {
                            if (unlinkErr) {
                                return reject(unlinkErr);
                            } else {
                                return resolve(true);
                            }
                        });
                    } else {
                        return reject(closeErr);
                    }
                })
            }
        });
    });
}

module.exports = del;
