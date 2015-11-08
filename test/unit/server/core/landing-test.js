'use strict';

const
    any = require('../../../helpers/any'),
    landing = require('../../../../lib/server/core/landing'),
    resourcesController = require('../../../../lib/server/resources/resources-controller');

suite('landing config', function () {
    let sandbox;

    setup(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(resourcesController, 'listResourceTypes');
    });

    teardown(function () {
        sandbox.restore();
    });

    test('that the plugin is defined', function () {
        assert.equals(landing.register.attributes, {
            name: 'landing'
        });
    });

    test('that the landing page route is configured', function () {
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
});
