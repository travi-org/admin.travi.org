import {listOf, simpleObject, string} from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';
import routes from '../../../../lib/server/resources/routes';
import * as resourcesController from '../../../../lib/server/resources/controller';
import {getResourceHandler} from '../../../../lib/server/resources/route-handlers';

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
        assert.deepEqual(routes.register.attributes, {
            name: 'resources-routes'
        });
    });

    test('that the list route is configured', () => {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            resourceType = string(),
            server = {route: sinon.stub()},
            resourceList = listOf(simpleObject);
        server.route.withArgs(sinon.match({path: '/{resourceType}'})).yieldsTo('handler', {
            params: {resourceType}
        }, reply);
        resourcesController.getListOf.yields(null, resourceList);

        routes.register(server, null, next);

        assert.calledOnce(next);
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
            server = {route: sinon.stub()},
            error = simpleObject();
        server.route.withArgs(sinon.match({path: '/{resourceType}'})).yieldsTo('handler', {
            params: {resourceType}
        }, reply);
        resourcesController.getListOf.yields(error);

        routes.register(server, null, next);

        assert.calledWith(reply, error);
    });


    test('that the single resource route is configured', () => {
        const
            next = sinon.spy(),
            server = {route: sinon.stub()};

        routes.register(server, null, next);

        assert.calledOnce(next);
        assert.calledWith(server.route, {
            method: 'GET',
            path: '/{resourceType}/{id}',
            handler: getResourceHandler
        });
    });
});
