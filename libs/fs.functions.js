const fs = require('fs');

module.exports.asyncMkdir = (path) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

module.exports.asyncUnlink = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

module.exports.asyncRename = (path, fileName) => {
  return new Promise((resolve, reject) => {
    fs.rename(path, fileName, function (err) {
      if (err) {
        return reject({ status: err, err: true });
      }
      return resolve();
    });
  });
};
