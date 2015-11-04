'use strict';

var traviApiResources = require('./travi-api-resources'),
    resourceMapperFactory = require('./mappers/resource-mapper-factory'),
    _ = require('lodash');

function removeSelfLinkFrom(resourceTypes) {
    var selfIndex = resourceTypes.indexOf('self');

    if (selfIndex > -1) {
        resourceTypes.splice(selfIndex, 1);
    }
}

function listResourceTypes(callback) {
    traviApiResources.getLinksFor('catalog', function (err, links) {
        var rels = Object.keys(links);

        removeSelfLinkFrom(rels);

        callback(null, _.map(rels, function (rel) {
            return {
                text: rel,
                path: '/' + rel
            };
        }));
    });
}

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
    listResourceTypes: listResourceTypes,
    getResource: getResource,
    getListOf: getListOf
};
