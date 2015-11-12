'use strict';

const
    traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal'),
    _ = require('lodash');

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

module.exports = (function () {
    let apiRoot = 'https://api.travi.org/';

    function getResourceList(document, resourceType) {
        let list = [];
        const embedded = document._embedded[resourceType];

        if (_.isArray(embedded)) {
            list = embedded;
        } else {
            list.push(embedded);
        }
        return list;
    }

    function getLinksFor(resource, callback) {
        traverson.from(apiRoot).getResource(function (err, document) {
            if (err) {
                callback(err);
            } else {
                callback(null, document._links);
            }
        });
    }

    function getListOf(resourceType, callback) {
        traverson
            .from(apiRoot)
            .follow(resourceType)
            .getResource(function (err, document) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, getResourceList(document, resourceType));
                }
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
