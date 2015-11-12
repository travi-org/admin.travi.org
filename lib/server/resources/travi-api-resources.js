'use strict';

const
    traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal'),
    _ = require('lodash');

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

module.exports = (function () {
    let apiRoot = 'https://api.travi.org/';

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
                let list = [];
                const embedded = document._embedded[resourceType];

                if (_.isArray(embedded)) {
                    list = embedded;
                } else {
                    list.push(embedded);
                }

                callback(null, list);
            });
    }

    function getResourceBy(resourceType, resourceId, callback) {
        traverson
            .from(apiRoot)
            .follow(resourceType, `${resourceType}[id:${resourceId}]`)
            .getResource(function (err, document) {
                callback(err, document);
            });
    }

    function setHost(host) {
        apiRoot = host;
    }

    if ('local' === process.argv[2]) {
        setHost('http://localhost:3000');
    }

    return {
        getLinksFor,
        getListOf,
        getResourceBy,
        setHost
    };
}());
