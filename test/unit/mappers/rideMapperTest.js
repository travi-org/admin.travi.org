'use strict';

var mapper = require('../../../lib/mappers/rideMapper'),

    any = require('../../helpers/any-for-admin');

suite('ride mapper', function () {
    test('that the expected methods are exposed', function () {
        assert.isFunction(mapper.mapToViewList);
    });

    test('that ride resources mapped to view list', function () {
        var ride = any.resources.ride();

        assert.equals(
            [{
                id: ride.id,
                displayName: ride.nickname
            }],
            mapper.mapToViewList([ride])
        );
    });
});
