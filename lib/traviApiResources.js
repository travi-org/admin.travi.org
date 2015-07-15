'use strict';

var traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal');

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
            callback(null, document[resourceType]);
        });
}

function setHost(host) {
    apiRoot = host;
}

module.exports = {
    getLinksFor: getLinksFor,
    getListOf: getListOf,
    setHost: setHost
};
