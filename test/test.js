'use strict';

var fzip = require('..')
  , zip = require('../src/zip');


describe('zip', function () {
  it('should zip two or more arrays', function () {
    zip([0, 1, 2], [2, 1, 0]).should.eql([[0, 2], [1, 1], [2, 0]]);
  });

  it('should zip the only array in a uniform way', function () {
    zip([0, 1, 2]).should.eql([[0], [1], [2]]);
  });

  it('should return null if no arrays given', function () {
    (zip() == null).should.be.true;
  });
});


describe('fzip', function () {
  it('should zip and map', function () {
    fzip([0, 1, 2], [2, 1, 0], function (a, b) {
      return a + b;
    }).should.eql([2, 2, 2]);

    fzip([0, 1, 2], function (x) {
      return 2 - x;
    }).should.eql([2, 1, 0]);

    (fzip(function () {}) == null).should.be.true;
  });

  it('should fall back to plain zip', function () {
    fzip([0, 1, 2], [2, 1, 0]).should.eql([[0, 2], [1, 1], [2, 0]]);
    fzip([0, 1, 2]).should.eql([[0], [1], [2]]);
    (fzip() == null).should.be.true;
  });

  it('should construct objects according to a string spec', function () {
    fzip(['mom', 'dad', 'dog'], ['dear', 'awesome', 'joyful'], 'name, adjective').should.eql([{
      name: 'mom',
      adjective: 'dear'
    }, {
      name: 'dad',
      adjective: 'awesome'
    }, {
      name: 'dog',
      adjective: 'joyful'
    }]);

    fzip(['mom', 'dad', 'dog'], 'name').should.eql([{ name: 'mom' },
                                                    { name: 'dad' },
                                                    { name: 'dog' }]);

    (fzip('') == null).should.be.true;
  });
});


describe('fzip.each', function () {
  it('should iterate over zipped result', function () {
    var sums = [];

    (fzip.each([0, 1, 2], [2, 1, 0], function (a, b) {
      sums.push(a + b);
    }) == null).should.be.true;

    sums.should.eql([2, 2, 2]);

    var sum = 0;

    (fzip.each([0, 1, 2], function (a) {
      sum += a;
    }) == null).should.be.true;

    sum.should.equal(3);

    (fzip.each(function () {
      false.should.be.ok;
    }) == null).should.be.true;
  });
});