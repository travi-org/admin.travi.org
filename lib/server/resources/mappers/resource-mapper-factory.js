'use strict';

function getMapperFor(resourceType) {
    switch (resourceType) {
    case 'users':
        return require('./user-mapper');
    case 'rides':
        return require('./ride-mapper');
    default:
        return require('./default-mapper');
    }
}

module.exports = {
    getMapperFor: getMapperFor
};
