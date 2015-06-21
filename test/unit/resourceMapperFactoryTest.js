'use strict';

var mapperFactory = require('../../lib/resourceMapperFactory');

suite('resource mapper factory', function () {
    test('that a mapper is returned', function () {
        assert.isFunction(mapperFactory.getMapper().map);
    });
});
