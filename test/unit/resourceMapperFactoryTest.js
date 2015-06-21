'use strict';

var mapperFactory = require('../../lib/resourceMapperFactory');

suite('resource mapper factory', function () {
    test('that the default mapper is returned when a specific mapper is not available', function () {
        assert.same(mapperFactory.getMapperFor('foo'), require('../../lib/mappers/defaultMapper'));
    });
});
