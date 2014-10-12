'use strict';

var zip = require('lodash.zip');


module.exports = function () {
  if (arguments.length <= 1) {
    return null;
  }

  var collections = [].slice.call(arguments, 0, -1)
    , mapper = [].slice.call(arguments, -1)[0];

  // If no callback passed, fall back to plain zip.
  if (typeof mapper != 'function') {
    collections.push(mapper);
    return zip.apply(null, collections);
  }

  return zip.apply(null, collections).map(function (items) {
    return mapper.apply(null, items);
  });
};