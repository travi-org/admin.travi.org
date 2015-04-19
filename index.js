'use strict';

var hapi = require('hapi'),
    traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal'),

    server = new hapi.Server();

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

server.connection({port: 3333});

function removeSelfLinkFrom(resourceTypes) {
    var selfIndex = resourceTypes.indexOf('self');

    if (selfIndex > -1) {
        resourceTypes.splice(selfIndex, 1);
    }
}

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        traverson.from('http://api.travi.org/')
            .jsonHal()
            .get(function (error, response) {
                var resourceTypes = Object.keys(JSON.parse(response.body)._links);

                removeSelfLinkFrom(resourceTypes);

                reply(resourceTypes);
            });
    }
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
        reply({message: 'Hello World'});
    }
});

if (!module.parent) {
    server.start(function (err) {
        if (err) {
            return console.error(err);
        }

        server.log('Server started', server.info.uri);
    });
}

module.exports = server;