import any from '@travi/any';
import landing from '../../../../lib/server/core/landing';
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
        assert.deepEqual(landing.register.attributes, {
            name: 'landing'
        });
    });

    test('that the landing page route is configured', () => {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            server = {
                route: sinon.stub().yieldsTo('handler', null, reply)
            },
            types = any.listOf(any.simpleObject);
        resourcesController.listResourceTypes.yields(null, types);

        landing.register(server, null, next);

        assert.calledOnce(next);
        assert.calledWith(server.route, sinon.match({
            method: 'GET',
            path: '/'
        }));
        assert.calledWith(reply, {
            primaryNav: types
        });
    });

    test('that error bubbles', () => {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            error = any.simpleObject(),
            server = {
                route: sinon.stub().yieldsTo('handler', null, reply)
            };
        resourcesController.listResourceTypes.yields(error);

        landing.register(server, null, next);

        assert.calledWith(reply, error);
    });
});
