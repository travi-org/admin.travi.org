'use strict';

var traverson = require('traverson');

module.exports = {
    getLinksFor: function (resource, callback) {
        traverson.from('http://api.travi.org/').get(function (request, reply) {
            callback(null, JSON.parse(reply.body)._links);
        });
    }
};