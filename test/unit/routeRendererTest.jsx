const
    React = require('react'),
    reactRouter = require('react-router'),
    any = require('../helpers/any'),

    renderer = require('../../lib/route-renderer'),
    routes = require('../../lib/routes.jsx');

suite('route renderer', function () {
    'use strict';

    let matchCallback;

    setup(function () {
        sinon.stub(React, 'renderToString');
        sinon.stub(reactRouter, 'match');
    });

    teardown(function () {
        React.renderToString.restore();
        reactRouter.match.restore();
    });

    test('that rendered html yielded for proper route', function () {
        const
            renderedContent = any.string(),
            callback = sinon.spy(),
            location = any.url();
        //reactRouter.match.yields(any.string());
        React.renderToString.returns(renderedContent);

        renderer.routeTo(location, callback);

        refute.called(callback);

        assert.calledWith(reactRouter.match, {routes, location});
        reactRouter.match.yield(null, null, any.string());

        assert.calledWith(callback, null, renderedContent);
    });

    test('that errors bubble', function () {
        const
            error = any.simpleObject(),
            callback = sinon.spy();
        renderer.routeTo(any.url(), callback);

        reactRouter.match.yield(error);

        assert.calledWith(callback, error);
    });
});
