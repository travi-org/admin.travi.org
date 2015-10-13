const negotiator = sinon.stub();
const
    testWrapper = {
        Negotiator: require('negotiator')
    },
    any = require('../../helpers/any'),

    Negotiator = sinon.stub(),
    proxyquire = require('proxyquire'),
    handler = proxyquire('../../../lib/server/renderingHandler', {
        'negotiator': Negotiator
    });

suite('rendering handler', function () {
    'use strict';

    let sandbox,
        mediaType,
        request;

    setup(function () {
        sandbox = sinon.sandbox.create();

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
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply);
        mediaType.returns('text/html');

        handler.configureHandlerFor({
            ext: extension
        });

        assert.calledOnce(reply.view);
    });
});
