'use strict';

const
    proxyquire = require('proxyquire'),
    routeRenderer = require('../../../../lib/server/view/route-renderer.jsx'),
    resourcesController = require('../../../../lib/server/resources/controller'),
    history = require('history'),
    _ = require('lodash'),
    any = require('../../../helpers/any');

suite('rendering handler', function () {
    const
        Negotiator = sinon.stub(),
        handler = proxyquire('../../../../lib/server/view/rendering-handler', {
            'negotiator': Negotiator
        }),
        primaryNav = any.listOf(
            function () {
                return {
                    text: any.string()
                };
            },
            {min: 5}
        );

    let sandbox,
        mediaType,
        request;

    setup(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(routeRenderer, 'routeTo');
        sandbox.stub(history, 'createLocation');
        sandbox.stub(resourcesController, 'listResourceTypes').yields(null, primaryNav);

        request = any.simpleObject();
        request.url = any.url();
        mediaType = sinon.stub();
        Negotiator.withArgs(request).returns({mediaType});
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
        request.response = {source: {resourceType: primaryNav[2].text}};
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
            primaryNav: _.map(primaryNav, function (item, index) {
                return _.extend({}, item, {active: 2 === index});
            })
        }));
        routeRenderer.routeTo.yield(null, renderedContent);

        assert.calledWith(reply.view, 'layout/layout', {renderedContent});
    });

    test('that error bubbles', function () {
        const
            reply = sinon.spy(),
            callback = any.simpleObject(),
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply);
        mediaType.returns('text/html');
        resourcesController.listResourceTypes.yields(callback);

        handler.register({ext: extension}, null, sinon.spy());

        assert.calledWith(reply, callback);
    });
});
