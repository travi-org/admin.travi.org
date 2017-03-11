import {getMapperFor} from '../../../../../src/server/resources/mappers/resource-mapper-factory';
import {assert} from 'chai';

suite('resource mapper factory', () => {
    test('that the default mapper is returned when a specific mapper is not available', () => {
        assert.equal(
            getMapperFor('foo'),
            require('../../../../../src/server/resources/mappers/default-mapper')
        );
    });

    test('that the user mapper is returned for persons', () => {
        assert.equal(
            getMapperFor('persons'),
            require('../../../../../src/server/resources/mappers/person-mapper')
        );
    });

    test('that the ride mapper is returned for users', () => {
        assert.equal(
            getMapperFor('rides'),
            require('../../../../../src/server/resources/mappers/ride-mapper')
        );
    });
});
