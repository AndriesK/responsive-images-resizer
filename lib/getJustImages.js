function returnJustImages(folderContents, ALLOWED_FORMATS) {
  let regExpString = '(';
  for (let i = 0; i < ALLOWED_FORMATS.length; i++) {
    if (ALLOWED_FORMATS[i][0] !== '.') {
      ALLOWED_FORMATS[i] = '.' + ALLOWED_FORMATS[i];
    }
    if (i !== ALLOWED_FORMATS.length - 1) {
      regExpString += `\\${ALLOWED_FORMATS[i]}|`;
    } else {
      regExpString += `\\${ALLOWED_FORMATS[i]}`;
    }
  }
  regExpString += ')$';
  const IS_IMAGE_REGEXP = new RegExp(regExpString, 'i');
  folderContents = folderContents.filter((name) => {
    return IS_IMAGE_REGEXP.test(name);
  });
  return folderContents;
}

module.exports = returnJustImages;
