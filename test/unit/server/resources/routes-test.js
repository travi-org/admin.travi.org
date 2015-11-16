'use strict';

const
    any = require('../../../helpers/any'),
    resources = require('../../../../lib/server/resources/routes'),
    resourcesController = require('../../../../lib/server/resources/controller');

suite('server routes config', function () {
    let sandbox;

    setup(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(resourcesController, 'getListOf');
        sandbox.stub(resourcesController, 'getResource');
    });

    teardown(function () {
        sandbox.restore();
    });

    test('that the plugin is defined', function () {
        assert.equals(resources.register.attributes, {
            name: 'resources-routes'
        });
    });

    test('that the list route is configured', function () {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            resourceType = any.string(),
            server = {
                route: sinon.stub().yieldsTo('handler', {
                    params: {resourceType}
                }, reply)
            },
            resourceList = any.listOf(any.simpleObject);
        resourcesController.getListOf.yields(null, resourceList);

        resources.register(server, null, next);

        assert.calledOnce(next);
        assert.calledWith(server.route, sinon.match({
            method: 'GET',
            path: '/{resourceType}'
        }));
        assert.calledWith(reply, {
            resources: resourceList
        });
    });

    test('that error bubbles for list route', function () {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            resourceType = any.string(),
            server = {
                route: sinon.stub().yieldsTo('handler', {
                    params: {resourceType}
                }, reply)
            },
            error = any.simpleObject();
        resourcesController.getListOf.yields(error);

        resources.register(server, null, next);

        assert.calledWith(reply, error);
    });

    test('that the single resource route is configured', function () {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            resourceType = any.string(),
            server = {
                route: sinon.stub().yieldsTo('handler', {
                    params: {resourceType}
                }, reply)
            },
            resource = any.simpleObject();
        resourcesController.getResource.yields(null, resource);

        resources.register(server, null, next);

        assert.calledOnce(next);
        assert.calledWith(server.route, sinon.match({
            method: 'GET',
            path: '/{resourceType}/{id}'
        }));
        assert.calledWith(reply, {resource});
    });

    test('that error bubbles for resource route', function () {
        const
            reply = sinon.spy(),
            next = sinon.spy(),
            resourceType = any.string(),
            server = {
                route: sinon.stub().yieldsTo('handler', {
                    params: {resourceType}
                }, reply)
            },
            error = any.simpleObject();
        resourcesController.getResource.yields(error);

        resources.register(server, null, next);

        assert.calledWith(reply, error);
    });
});
