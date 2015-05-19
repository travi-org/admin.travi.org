'use strict';

var traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal');

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

var apiRoot = 'http://api.travi.org/';

function getLinksFor(resource, callback) {
    traverson.from(apiRoot).getResource(function (error, document) {
        callback(null, document._links);
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

module.exports = {
    getLinksFor: getLinksFor,
    getListOf: getListOf
};
