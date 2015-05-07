'use strict';

var traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal');

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

module.exports = {
    getLinksFor: function (resource, callback) {
        traverson.from('http://api.travi.org/').get(function (error, reply) {
            callback(null, JSON.parse(reply.body)._links);
        });
    }
};