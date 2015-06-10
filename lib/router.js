'use strict';

var _ = require('lodash'),

    traviApiResources = require('./traviApiResources');

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

module.exports = {
    listResourceTypes: listResourceTypes
};
