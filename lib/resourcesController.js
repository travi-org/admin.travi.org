'use strict';

var traviApiResources = require('./traviApiResources'),
    resourceMapperFactory = require('./resourceMapperFactory');

function getListOf(resourceType, callback) {
    traviApiResources.getListOf(resourceType, function (err, list) {
        callback(null, resourceMapperFactory.getMapperFor(resourceType).mapToViewList(list));
    });
}

module.exports = {
    getListOf: getListOf
};
