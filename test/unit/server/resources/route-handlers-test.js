import {getResourceHandler} from '../../../../lib/server/resources/route-handlers';
import * as resourcesController from '../../../../lib/server/resources/controller';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';

suite('route handlers', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(resourcesController, 'getResource');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the single resource route handler eventually returns the resource', () => {
        const
            resource = any.simpleObject(),
            reply = sinon.spy(),
            params = {resourceType: any.string(), id: any.integer()};
        resourcesController.getResource.withArgs(params.resourceType, params.id).resolves(resource);

        return getResourceHandler({params}, reply).then(() => {
            assert.calledWith(reply, {resource});
        });
    });

    test('that the single resource route handler eventually handles errors', () => {
        const
            error = any.simpleObject(),
            reply = sinon.spy();
        resourcesController.getResource.rejects(error);

        return getResourceHandler({params: {}}, reply).then(assert.fail).catch(() => {
            assert.calledWith(reply, error);
        });
    });
});
