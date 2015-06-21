'use strict';

function getMapperFor(resourceType) {
    switch (resourceType) {
    case 'users':
        return require('./mappers/userMapper');
    case 'rides':
        return require('./mappers/rideMapper');
    default:
        return require('./mappers/defaultMapper');
    }
}

module.exports = {
    getMapperFor: getMapperFor
};
