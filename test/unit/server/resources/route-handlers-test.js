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
        });
    let sandbox, mediaType;

    setup(() => {
        sandbox = sinon.sandbox.create();
        mediaType = sinon.stub();
    });

    teardown(() => {
        sandbox.restore();
        Negotiator.reset();
    });

    suite('single resource', () => {
        const params = {resourceType: any.string(), id: any.integer()};

        setup(() => {
            sandbox.stub(resourcesController, 'getResource');
            Negotiator.withArgs({params}).returns({mediaType});
        });

        test('that the resource is eventually returned', () => {
            const
                resource = any.simpleObject(),
                reply = sinon.spy();
            resourcesController.getResource.withArgs(params.resourceType, params.id).resolves(resource);
            mediaType.returns('text/foo');

            return handlers.getResourceHandler({params}, reply).then(() => {
                assert.calledWith(reply, {resource});
            });
        });

        test('that errors are eventually handled', () => {
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

    suite('list', () => {
        const params = {resourceType: any.string()};

        setup(() => {
            sandbox.stub(resourcesController, 'getListOf');
            Negotiator.withArgs({params}).returns({mediaType});
        });

        test('that the resource is eventually returned', () => {
            const
                resources = any.listOf(any.simpleObject),
                reply = sinon.spy();
            resourcesController.getListOf.withArgs(params.resourceType).resolves(resources);
            mediaType.returns('text/foo');

            return handlers.getResourcesHandler({params}, reply).then(() => {
                assert.calledWith(reply, {[params.resourceType]: resources, resourceType: params.resourceType});
            });
        });

        test('that errors are eventually handled', () => {
            const
                error = any.simpleObject(),
                reply = sinon.spy();
            resourcesController.getListOf.rejects(error);
            mediaType.returns('text/foo');

            return handlers.getResourcesHandler({params}, reply).then(assert.fail).catch(() => {
                assert.calledWith(reply, error);
            });
        });

        test('that a request for html does not fetch data', () => {
            mediaType.returns('text/html');
            const
                reply = sinon.spy(),

                promise = handlers.getResourcesHandler({params}, reply);

            assert.notCalled(resourcesController.getListOf);
            assert.calledWith(reply, {});

            return assert.isFulfilled(promise);
        });
    });
});
