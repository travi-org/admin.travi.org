const
    React = require('react'), //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    reactRouter = require('react-router'),
    Router = reactRouter.Router,

    routes = require('../../lib/routes.jsx');

suite('routes', function () {
    'use strict';

    let node;
    beforeEach(function () {
        node = document.createElement('div')
    });

    afterEach(function () {
        dom.unmountComponentAtNode(node)
    });

    test('that the root route is defined', function () {
        dom.render((
            <Router>
                { routes }
            </Router>
        ), node, function () {
            assert.equals(node.querySelectorAll('#wrap').length, 1);
        });
    });
});
