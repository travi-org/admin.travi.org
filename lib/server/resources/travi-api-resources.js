import traverson from 'traverson';
import JsonHalAdapter from 'traverson-hal';
import _ from 'lodash';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

module.exports = (function () {
    let apiRoot = 'https://api.travi.org/';
    const ENVIRONMENT_ARG = 2;

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
        traverson.from(apiRoot).getResource((err, document) => {
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
            .getResource((err, document) => {
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
            .follow(resourceType, `${resourceType}[id:${resourceId}]`, 'self')
            .getResource((err, resource) => {
                if (err) {
                    callback(err);
                } else {
                    callback(err, resource);
                }
            });
    }

    function setHost(host) {
        apiRoot = host;
    }

    if ('local' === process.argv[ENVIRONMENT_ARG]) {
        setHost('http://localhost:3000');
    }

    return {
        getLinksFor,
        getListOf,
        getResourceBy,
        setHost
    };
}());
