const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const { asyncMkdir, asyncUnlink, asyncRename } = require('../libs/fs.functions');
const { validFile } = require('../libs/validations');

module.exports = (req) => {
  const form = formidable({ multiples: true });
  return new Promise((resolve, reject) => {
    const upload = path.join('./', 'files');

    if (!fs.existsSync(upload)) {
      asyncMkdir(upload);
    }
    const pathFiles = [];
    form.uploadDir = path.join(process.cwd(), upload);
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      let images = '';
      let filePath = '';
      const valid = validFile(fields, files);

      if (Object.keys(files).length) {
        const filesArray = files.images.constructor !== Array ? [files.images] : files.images;

        filesArray.forEach((file) => {
          if (!file.size || valid.err) asyncUnlink(file.path);
          if (valid.err) return reject(valid.status);

          if (file.size) {
            const fileName = path.join(upload, file.name);
            pathFiles.push(fileName);
            asyncRename(file.path, fileName);
          }
        });
        images = filesArray[0];
        filePath = pathFiles[0];
      }
      if (valid.err) return reject(valid.status);
      resolve({ fields, images, filePath });
    });
  });
};
