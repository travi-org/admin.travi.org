'use strict';

function getMapper() {
    return require('./mappers/defaultMapper');
}

module.exports = {
    getMapper: getMapper
};
