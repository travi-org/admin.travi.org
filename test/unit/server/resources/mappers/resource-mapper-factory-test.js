'use strict';

const mapperFactory = require('../../../../../lib/server/resources/mappers/resource-mapper-factory');

suite('resource mapper factory', () => {
    test('that the default mapper is returned when a specific mapper is not available', () => {
        assert.same(
            mapperFactory.getMapperFor('foo'),
            require('../../../../../lib/server/resources/mappers/default-mapper')
        );
    });

    test('that the user mapper is returned for users', () => {
        assert.same(
            mapperFactory.getMapperFor('users'),
            require('../../../../../lib/server/resources/mappers/user-mapper')
        );
    });

    test('that the ride mapper is returned for users', () => {
        assert.same(
            mapperFactory.getMapperFor('rides'),
            require('../../../../../lib/server/resources/mappers/ride-mapper')
        );
    });
});
