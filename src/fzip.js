'use strict';

var zip = require('./zip');


/**
 * Make fzip that uses arrayMethod to transform the zipped result.
 */
var makeFzip = function (arrayMethod) {
  return function () {
    if (!arguments.length) {
      return null;
    }

    var collections = [].slice.call(arguments, 0, -1)
      , mapper = [].slice.call(arguments, -1)[0];

    // If no callback passed, fall back to plain zip.
    if (typeof mapper != 'function') {
      collections.push(mapper);
      return zip.apply(null, collections);
    }

    if (!collections.length) {
      return null;
    }

    return zip.apply(null, collections)[arrayMethod](function (items) {
      return mapper.apply(null, items);
    });
  };
};


module.exports = makeFzip('map');
module.exports.each = makeFzip('forEach');
