'use strict';

const
    traviApiResources = require('./travi-api-resources'),
    resourceMapperFactory = require('./mappers/resource-mapper-factory'),
    _ = require('lodash');

function removeSelfLinkFrom(resourceTypes) {
    const selfIndex = resourceTypes.indexOf('self');

    if (_.includes(resourceTypes, 'self')) {
        resourceTypes.splice(selfIndex, 1);
    }
}

function listResourceTypes(callback) {
    traviApiResources.getLinksFor('catalog', (err, links) => {
        if (err) {
            callback(err);
        } else {
            const rels = Object.keys(links);

            removeSelfLinkFrom(rels);

            callback(null, _.map(rels, (rel) => {
                return {
                    text: rel,
                    path: `/${rel}`
                };
            }));
        }
    });
}

function getResource(resourceType, resourceId, callback) {
    traviApiResources.getResourceBy(resourceType, resourceId, (err, resource) => {
        if (err) {
            callback(err);
        } else {
            callback(null, resourceMapperFactory.getMapperFor(resourceType).mapToView(resource));
        }
    });
}

function getListOf(resourceType, callback) {
    traviApiResources.getListOf(resourceType, (err, list) => {
        if (err) {
            callback(err);
        } else {
            callback(null, resourceMapperFactory.getMapperFor(resourceType).mapToViewList(list));
        }
    });
}

module.exports = {
    listResourceTypes,
    getResource,
    getListOf
};
