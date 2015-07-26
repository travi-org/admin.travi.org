'use strict';

var traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal'),
    _ = require('lodash');

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

var apiRoot = 'https://api.travi.org/';

function getLinksFor(resource, callback) {
    traverson.from(apiRoot).getResource(function (error, document) {
        callback(error, document._links);
    });
}

function getListOf(resourceType, callback) {
    traverson
        .from(apiRoot)
        .follow(resourceType)
        .getResource(function (err, document) {
            var list = [],
                embedded = document._embedded[resourceType];

            if (_.isArray(embedded)) {
                list = embedded;
            } else {
                list.push(embedded);
            }

            callback(null, list);
        });
}

function getResourceBy() {
    return;
}

function setHost(host) {
    apiRoot = host;
}

module.exports = {
    getLinksFor: getLinksFor,
    getListOf: getListOf,
    getResourceBy: getResourceBy,
    setHost: setHost
};
