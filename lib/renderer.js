'use strict';

var React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    Negotiator = require('negotiator'),
    viewProxy = require('./views/viewProxy');

require('jsx-require-extension');

function render(viewName, data, request, reply) {
    var negotiator = new Negotiator(request);

    if ('text/html' === negotiator.mediaType()) {
        reply.view('layout/layout', {
            renderedContent: ReactDOMServer.renderToString(React.createElement(viewProxy.getComponent(viewName), data))
        });
    } else {
        reply(data);
    }
}

module.exports = {
    render: render
};
