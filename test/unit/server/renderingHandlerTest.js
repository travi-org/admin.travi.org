const
    any = require('../../helpers/any'),

    Negotiator = sinon.stub(),
    proxyquire = require('proxyquire'),
    history = require('history'),
    handler = proxyquire('../../../lib/server/rendering-handler', {
        'negotiator': Negotiator
    }),
    routeRenderer = require('../../../lib/server/route-renderer.jsx'),
    resourceList = require('../../../lib/router');

suite('rendering handler', function () {
    'use strict';

    let sandbox,
        mediaType,
        request = {
            url: any.url()
        };
    const primaryNav = any.listOf(any.string);

    setup(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(routeRenderer, 'routeTo');
        sandbox.stub(history, 'createLocation');
        sandbox.stub(resourceList, 'listResourceTypes').yields(null, primaryNav);

        request = any.simpleObject();
        mediaType = sinon.stub();
        Negotiator.withArgs(request).returns({
            mediaType: mediaType
        });
    });

    teardown(function () {
        sandbox.restore();
        Negotiator.reset();
    });

    test('that a non-html request is forwarded with no modification', function () {
        const
            reply = { continue: sinon.spy() },
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply);
        mediaType.returns('text/foo');

        handler.configureHandlerFor({
            ext: extension
        });

        assert.calledOnce(reply.continue);
    });

    test('that an html request returns a rendered view', function () {
        const
            reply = { view: sinon.spy() },
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply),
            location = any.simpleObject(),
            renderedContent = any.string();
        mediaType.returns('text/html');
        history.createLocation.withArgs(request.url).returns(location);

        handler.configureHandlerFor({
            ext: extension
        });

        refute.called(reply.view);

        assert.calledWith(routeRenderer.routeTo, location, {
            primaryNav: primaryNav
        });
        routeRenderer.routeTo.yield(null, renderedContent);

        assert.calledWith(reply.view, 'layout/layout', {
            renderedContent: renderedContent
        });
    });
});
