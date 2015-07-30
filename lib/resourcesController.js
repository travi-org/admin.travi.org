'use strict';

var traviApiResources = require('./traviApiResources'),
    resourceMapperFactory = require('./resourceMapperFactory');

function getResource(resourceType, resourceId, callback) {
    traviApiResources.getResourceBy(resourceType, resourceId, function (err, resource) {
        callback(null, resourceMapperFactory.getMapperFor(resourceType).mapToView(resource));
    });
}

function getListOf(resourceType, callback) {
    traviApiResources.getListOf(resourceType, function (err, list) {
        callback(null, resourceMapperFactory.getMapperFor(resourceType).mapToViewList(list));
    });
}

module.exports = {
    getResource: getResource,
    getListOf: getListOf
};
