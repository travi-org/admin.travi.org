import {listOf, simpleObject, string} from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';
import resources from '../../../../lib/server/resources/routes';
import * as resourcesController from '../../../../lib/server/resources/controller';

suite('server routes config', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(resourcesController, 'getListOf');
        sandbox.stub(resourcesController, 'getResource');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the plugin is defined', () => {
        assert.deepEqual(resources.register.attributes, {
            name: 'resources-routes'
        });
    });

    test('that the list route is configured', () => {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            resourceType = string(),
            server = {
                route: sinon.stub().yieldsTo('handler', {
                    params: {resourceType}
                }, reply)
            },
            resourceList = listOf(simpleObject);
        resourcesController.getListOf.yields(null, resourceList);

        resources.register(server, null, next);

        assert.calledOnce(next);
        assert.calledWith(server.route, sinon.match({
            method: 'GET',
            path: '/{resourceType}'
        }));
        assert.calledWith(reply, {
            [resourceType]: resourceList,
            resourceType
        });
    });

    test('that error bubbles for list route', () => {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            resourceType = string(),
            server = {
                route: sinon.stub().yieldsTo('handler', {
                    params: {resourceType}
                }, reply)
            },
            error = simpleObject();
        resourcesController.getListOf.yields(error);

        resources.register(server, null, next);

        assert.calledWith(reply, error);
    });

    test('that the single resource route is configured', () => {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            resourceType = string(),
            server = {
                route: sinon.stub().yieldsTo('handler', {
                    params: {resourceType}
                }, reply)
            },
            resource = simpleObject();
        resourcesController.getResource.yields(null, resource);

        resources.register(server, null, next);

        assert.calledOnce(next);
        assert.calledWith(server.route, sinon.match({
            method: 'GET',
            path: '/{resourceType}/{id}'
        }));
        assert.calledWith(reply, {resource});
    });

    test('that error bubbles for resource route', () => {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            resourceType = string(),
            server = {
                route: sinon.stub().yieldsTo('handler', {
                    params: {resourceType}
                }, reply)
            },
            error = simpleObject();
        resourcesController.getResource.yields(error);

        resources.register(server, null, next);

        assert.calledWith(reply, error);
    });
});
