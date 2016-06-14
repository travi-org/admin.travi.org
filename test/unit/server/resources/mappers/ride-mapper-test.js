import mapper from '../../../../../lib/server/resources/mappers/ride-mapper';
import {resources, url} from '../../../../helpers/any-for-admin';
import assert from 'assert';

suite('ride mapper', () => {
    test('that ride resources mapped to view list', () => {
        const ride = resources.ride();

        assert.deepEqual(
            [{
                id: ride.id,
                displayName: ride.nickname,
                links: {}
            }],
            mapper.mapToViewList([ride])
        );
    });

    test('that ride mapped to view', () => {
        const ride = resources.ride();

        assert.deepEqual(
            {
                id: ride.id,
                displayName: ride.nickname,
                links: {}
            },
            mapper.mapToView(ride)
        );
    });

    test('that self link defined when defined in api', () => {
        const ride = resources.ride();
        ride._links.self = url();

        assert.deepEqual(
            {
                'self': {
                    href: `/rides/${ride.id}`
                }
            },
            mapper.mapToView(ride).links
        );
    });
});
