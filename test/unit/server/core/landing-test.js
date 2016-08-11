import {listOf, simpleObject} from '@travi/any';
import * as landing from '../../../../lib/server/core/landing';
import * as resourcesController from '../../../../lib/server/resources/controller';
import sinon from 'sinon';
import {assert} from 'chai';

suite('landing config', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(resourcesController, 'listResourceTypes');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the plugin is defined', () => {
        const
            server = {route: sinon.spy()},
            next = sinon.spy();

        assert.deepEqual(landing.register.attributes, {
            name: 'landing'
        });

        landing.register(server, null, next);

        assert.calledOnce(next);
        assert.calledWith(server.route, sinon.match({
            method: 'GET',
            path: '/',
            handler: landing.handler
        }));
    });

    test('that the landing page route is configured', () => {
        const
            reply = sinon.spy(),
            types = listOf(simpleObject);
        resourcesController.listResourceTypes.resolves(types);

        return landing.handler(null, reply).then(() => {
            assert.calledWith(reply, {
                primaryNav: types
            });
        });
    });

    test('that error bubbles', () => {
        const
            reply = sinon.spy(),
            error = simpleObject();
        resourcesController.listResourceTypes.rejects(error);

        return landing.handler(null, reply).catch(() => {
            assert.calledWith(reply, error);
        });
    });
});
