const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

async function minify(inputFolder, outputFolder) {
    return await imagemin([inputFolder], outputFolder, {
        use: [
            imageminMozjpeg(),
            imageminPngquant({
                quality: [0.7, 0.9],
                speed: 1,
                floyd: 1
            })
        ]
    });
}

function execute(inputFolder, outputFolder, options = {
    allowedFormats: ['jpg', 'png', 'webp']
}) {
    const FORMATS_MINIFY = options.allowedFormats.join(",");
    const MINIFY_REGEXP = inputFolder + `/*.{${FORMATS_MINIFY}}`;
    return minify(MINIFY_REGEXP, outputFolder)
}

module.exports = execute;
