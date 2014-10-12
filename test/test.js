'use strict';

var fzip = require('..');


it('should zip and map', function () {
  fzip([0, 1, 2], [2, 1, 0], function (a, b) {
    return a + b;
  }).should.eql([2, 2, 2]);
});


it('should fall back to plain zip', function () {
  fzip([0, 1, 2], [2, 1, 0]).should.eql([[0, 2], [1, 1], [2, 0]]);
});