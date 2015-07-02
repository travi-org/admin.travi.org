'use strict';

var Negotiator = require('negotiator');

function render(viewName, data, request, reply) {
    var negotiator = new Negotiator(request);

    if ('text/html' === negotiator.mediaType()) {
        reply.view(viewName, data);
    } else {
        reply(data);
    }
}

module.exports = {
    render: render
};
