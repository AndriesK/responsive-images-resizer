const fs = require('fs-extra');

/* async  */
function del(filePath, stopAtCheck = false) {
    return /* await */ new Promise((resolve, reject) => {
        fs.open(filePath, 'r+', (openErr, fd) => {
            if (openErr && openErr.code === 'EBUSY') {
                console.log('E TUU BUSY');
                return reject(openErr);
            } else if (openErr && openErr.code === 'ENOENT') {
                console.log('E TUU NOENT');
                return reject(openErr);
            } else {
                console.log('E TUU E TUU E TUU E TUU E TUU E TUU E TUU E TUU E TUU NO ERROR', fd, filePath);
                fs.close(fd, (closeErr) => {
                    if (!closeErr) {
                        if (stopAtCheck) {
                            return resolve(true);
                        } else {
                            console.log('GO ON');
                            fs.removeSync(filePath);
                            // fs.unlink(filePath, (unlinkErr) => {
                            //     if (unlinkErr) {
                            //         console.log('UNLINK ERR', unlinkErr);
                            //         return reject(unlinkErr);
                            //     } else {
                            //         return resolve(true);
                            //     }
                            // });
                        }
                    } else {
                        console.log(' \n\n\n\n\n\n\n\n\n\n\n\n\n\n OH DIS DE ERR \n\n\n\n\n\n\n\n\n\n\n\n\n\n');
                        return reject(closeErr);
                    }
                })
            }
        });
    });

    // fs.open(filePath, 'r+', (openErr, fd) => {
    //     if (openErr && openErr.code === 'EBUSY') {
    //         return resolve(openErr);
    //     } else if (openErr && openErr.code === 'ENOENT') {
    //         return resolve(openErr);
    //     } else {
    //         fs.close(fd, (closeErr) => {
    //             if (!closeErr) {
    //                 fs.unlink(filePath, (unlinkErr) => {
    //                     if (unlinkErr) {
    //                         return resolve(unlinkErr);
    //                     } else {
    //                         console.log('resolve', resolve);
    //                         return resolve(fd);
    //                     }
    //                 });
    //             } else {
    //                 return resolve(closeErr);
    //             }
    //         })
    //     }
    // });
}

module.exports = del;
