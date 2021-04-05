const _ = require('lodash');

module.exports.priceNoZiro = (obj) =>
  _.filter(obj, function (item) {
    return item.price > 0;
  });
