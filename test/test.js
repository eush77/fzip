'use strict';

var fzip = require('..');


describe('fzip', function () {
  it('should zip and map', function () {
    fzip([0, 1, 2], [2, 1, 0], function (a, b) {
      return a + b;
    }).should.eql([2, 2, 2]);
  });

  it('should fall back to plain zip', function () {
    fzip([0, 1, 2], [2, 1, 0]).should.eql([[0, 2], [1, 1], [2, 0]]);
  });
});


describe('fzip.each', function () {
  it('should iterate over zipped result', function () {
    var sums = [];

    (fzip.each([0, 1, 2], [2, 1, 0], function (a, b) {
      sums.push(a + b);
    }) == null).should.be.true;

    sums.should.eql([2, 2, 2]);
  });
});