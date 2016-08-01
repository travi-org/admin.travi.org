import sinon from 'sinon';
import {assert} from 'chai';
import routes from '../../../../lib/server/resources/routes';
import * as resourcesController from '../../../../lib/server/resources/controller';
import {getResourceHandler, getResourcesHandler} from '../../../../lib/server/resources/route-handlers';

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
            next = sinon.spy(),
            server = {route: sinon.stub()};

        routes.register(server, null, next);

        assert.calledOnce(next);
        assert.calledWith(server.route, {
            method: 'GET',
            path: '/{resourceType}',
            handler: getResourcesHandler
        });
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
