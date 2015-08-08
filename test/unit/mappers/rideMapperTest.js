'use strict';

var mapper = require('../../../lib/mappers/rideMapper'),

    any = require('../../helpers/any-for-admin');

suite('ride mapper', function () {
    test('that ride resources mapped to view list', function () {
        var ride = any.resources.ride();

        assert.equals(
            [{
                id: ride.id,
                displayName: ride.nickname,
                links: {}
            }],
            mapper.mapToViewList([ride])
        );
    });

    test('that ride mapped to view', function () {
        var ride = any.resources.ride();

        assert.equals(
            {
                id: ride.id,
                displayName: ride.nickname,
                links: {}
            },
            mapper.mapToView(ride)
        );
    });
});
