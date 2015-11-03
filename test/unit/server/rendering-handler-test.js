const
    any = require('../../helpers/any'),

    Negotiator = sinon.stub(),
    proxyquire = require('proxyquire'),
    _ = require('lodash'),
    history = require('history'),
    handler = proxyquire('../../../lib/server/rendering-handler', {
        'negotiator': Negotiator
    }),
    routeRenderer = require('../../../lib/server/route-renderer.jsx'),
    resourceList = require('../../../lib/router');

suite('rendering handler', function () {
    'use strict';

    const primaryNav = any.listOf(any.string);
    let sandbox,
        mediaType,
        request;

    setup(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(routeRenderer, 'routeTo');
        sandbox.stub(history, 'createLocation');
        sandbox.stub(resourceList, 'listResourceTypes').yields(null, primaryNav);

        request = any.simpleObject();
        request.url = any.url();
        mediaType = sinon.stub();
        Negotiator.withArgs(request).returns({
            mediaType: mediaType
        });
    });

    teardown(function () {
        sandbox.restore();
        Negotiator.reset();
    });

    test('that the plugin is defined', function () {
        assert.equals(handler.register.attributes, {
            name: 'rendering-handler'
        });
    });

    test('that a non-html request is forwarded with no modification', function () {
        const
            next = sinon.spy(),
            reply = { continue: sinon.spy() },
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply);
        mediaType.returns('text/foo');

        handler.register({ext: extension}, null, next);

        assert.calledOnce(next);
        assert.calledOnce(reply.continue);
    });

    test('that an html request returns a rendered view', function () {
        request.response = {source: any.simpleObject()};
        const
            reply = { view: sinon.spy() },
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply),
            location = any.simpleObject(),
            renderedContent = any.string();
        mediaType.returns('text/html');
        history.createLocation.withArgs(request.url).returns(location);

        handler.register({ext: extension}, null, sinon.spy());

        refute.called(reply.view);

        assert.calledWith(routeRenderer.routeTo, location, _.extend({}, request.response.source, {
            primaryNav: primaryNav
        }));
        routeRenderer.routeTo.yield(null, renderedContent);

        assert.calledWith(reply.view, 'layout/layout', {
            renderedContent: renderedContent
        });
    });
});
