'use strict';

var mapperFactory = require('../../lib/resourceMapperFactory');

suite('resource mapper factory', function () {
    test('that the default mapper is returned when a specific mapper is not available', function () {
        assert.same(mapperFactory.getMapperFor('foo'), require('../../lib/mappers/defaultMapper'));
    });

    test('that the user mapper is returned for users', function () {
        assert.same(mapperFactory.getMapperFor('users'), require('../../lib/mappers/userMapper'));
    });

    test('that the ride mapper is returned for users', function () {
        assert.same(mapperFactory.getMapperFor('rides'), require('../../lib/mappers/rideMapper'));
    });
});
