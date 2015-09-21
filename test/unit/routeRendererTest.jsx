const React = require('react'),
    reactRouter = require('react-router'),
    any = require('../helpers/any'),

    renderer = require('../../lib/route-renderer');

suite('route renderer', function () {
    setup(function () {
        sinon.stub(React, 'renderToString');
        sinon.stub(reactRouter, 'match');
    });

    teardown(function () {
        React.renderToString.restore();
        reactRouter.match.restore();
    });

    test('that rendered html yielded for proper route', function () {
        const renderedContent = any.string(),
            callback = sinon.spy();
        //reactRouter.match.yields(any.string());
        React.renderToString.returns(renderedContent);

        renderer.routeTo(any.url(), callback);

        assert.calledWith(callback, null, renderedContent);
    });
});
