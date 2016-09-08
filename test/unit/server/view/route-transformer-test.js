import {assert} from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import any from '@travi/any';

suite('route transformer', () => {
    let sandbox, mediaType, request;

    const
        Negotiator = sinon.stub(),
        transformer = proxyquire('../../../../lib/server/view/route-transformer', {
            'negotiator': Negotiator
        });

    setup(() => {
        sandbox = sinon.sandbox.create();

        mediaType = sinon.stub();
        request = {...any.simpleObject(), url: {path: any.url()}, setUrl: sinon.spy()};
        Negotiator.withArgs(request).returns({mediaType});
    });

    teardown(() => {
        sandbox.restore();
        Negotiator.reset();
    });

    test('that the plugin is defined', () => {
        assert.deepEqual(transformer.register.attributes, {
            name: 'route-transformer'
        });
    });

    test('that a non-html request is forwarded with no modification', () => {
        const
            server = {ext: sinon.stub()},
            reply = {continue: sinon.spy()},
            next = sinon.spy();
        server.ext.withArgs('onRequest').yields(request, reply);
        mediaType.returns('text/foo');

        transformer.register(server, null, next);

        assert.calledOnce(next);
        assert.calledOnce(reply.continue);
        assert.notCalled(request.setUrl);
    });

    test('that an html request updates the route to match the html route', () => {
        const
            server = {ext: sinon.stub()},
            reply = {continue: sinon.spy()},
            next = sinon.spy();
        server.ext.withArgs('onRequest').yields(request, reply);
        mediaType.returns('text/html');

        transformer.register(server, null, next);

        assert.calledOnce(next);
        assert.calledOnce(reply.continue);
        assert.calledWith(request.setUrl, '/html');
    });
});
