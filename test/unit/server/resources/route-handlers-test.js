import * as resourcesController from '../../../../lib/server/resources/controller';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import proxyquire from 'proxyquire';

suite('route handlers', () => {
    const
        Negotiator = sinon.stub(),
        handlers = proxyquire('../../../../lib/server/resources/route-handlers', {
            'negotiator': Negotiator
        }),
        params = {resourceType: any.string(), id: any.integer()};
    let sandbox, mediaType;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(resourcesController, 'getResource');
        mediaType = sinon.stub();
        Negotiator.withArgs({params}).returns({mediaType});
    });

    teardown(() => {
        sandbox.restore();
        Negotiator.reset();
    });

    test('that the single resource route handler eventually returns the resource', () => {
        const
            resource = any.simpleObject(),
            reply = sinon.spy();
        resourcesController.getResource.withArgs(params.resourceType, params.id).resolves(resource);
        mediaType.returns('text/foo');

        return handlers.getResourceHandler({params}, reply).then(() => {
            assert.calledWith(reply, {resource});
        });
    });

    test('that the single resource route handler eventually handles errors', () => {
        const
            error = any.simpleObject(),
            reply = sinon.spy();
        resourcesController.getResource.rejects(error);
        mediaType.returns('text/foo');

        return handlers.getResourceHandler({params}, reply).then(assert.fail).catch(() => {
            assert.calledWith(reply, error);
        });
    });

    test('that a request for html does not fetch data', () => {
        mediaType.returns('text/html');
        const
            reply = sinon.spy(),

            promise = handlers.getResourceHandler({params}, reply);

        assert.notCalled(resourcesController.getResource);
        assert.calledWith(reply, {});

        return assert.isFulfilled(promise);
    });
});
