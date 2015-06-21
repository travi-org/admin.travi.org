'use strict';

function getMapperFor() {
    return require('./mappers/defaultMapper');
}

module.exports = {
    getMapperFor: getMapperFor
};
