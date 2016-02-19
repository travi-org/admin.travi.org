'use strict';

const
    any = require('../../helpers/any'),
    hydraterFactory = require('../../../lib/client/route-hydrator'),
    repository = require('../../../lib/client/repository');

suite('route data hydration', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(repository, 'getResource');
        sandbox.stub(repository, 'getResources');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the single resource is fetched from the repository when an id exists in the route', () => {
        const
            resourceType = any.string(),
            resourceId = any.string(),
            callback = sinon.spy(),
            store = {
                dispatch: sinon.spy()
            },
            hydrater = hydraterFactory(store);

        hydrater.hydrate({
            location: {
                pathname: `/${resourceType}/${resourceId}`
            }
        }, null, callback);

        assert.calledWith(repository.getResource, resourceType, resourceId);
        refute.called(callback);

        repository.getResource.yield();

        assert.calledWith(store.dispatch, {
            type: 'SET_RESOURCE'
        });
        assert.calledOnce(callback);
        refute.called(repository.getResources);
    });

    test('that resources are fetched from the repository when an id is not present in the route', () => {
        const
            type = any.string(),
            resourceType = any.string(),
            resources = any.listOf(any.simpleObject),
            callback = sinon.spy(),
            store = {
                dispatch: sinon.spy()
            },
            hydrater = hydraterFactory(store);

        hydrater.hydrate({
            location: {
                pathname: `/${resourceType}`
            }
        }, null, callback);

        assert.calledWith(repository.getResources, resourceType);
        refute.called(callback);

        repository.getResources.yield(null, {
            resourceType: type,
            [type]: resources
        });

        assert.calledWith(store.dispatch, {
            type: 'SET_RESOURCES',
            resourceType: type,
            resources
        });
        assert.calledOnce(callback);
        refute.called(repository.getResource);
    });
});
