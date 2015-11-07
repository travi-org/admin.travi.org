const
    mapper = require('../../../../../lib/server/resources/mappers/ride-mapper'),
    any = require('../../../../helpers/any-for-admin');

suite('ride mapper', function () {
    test('that ride resources mapped to view list', function () {
        const ride = any.resources.ride();

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
        const ride = any.resources.ride();

        assert.equals(
            {
                id: ride.id,
                displayName: ride.nickname,
                links: {}
            },
            mapper.mapToView(ride)
        );
    });

    test('that self link defined when defined in api', function () {
        const ride = any.resources.ride();
        ride._links.self = any.url();

        assert.equals(
            {
                'self': {
                    href: `/rides/${ride.id}`
                }
            },
            mapper.mapToView(ride).links
        );
    });
});
