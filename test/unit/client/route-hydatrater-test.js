import {simpleObject, string, listOf} from '@travi/any';
import hydraterFactory from '../../../lib/client/route-hydrator';
import * as repository from '../../../lib/client/repository';
import sinon from 'sinon';
import {assert, refute} from 'referee';

suite('route data hydration', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(repository, 'getResources');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that resources are fetched from the repository when an id is not present in the route', () => {
        const
            type = string(),
            resourceType = string(),
            resources = listOf(simpleObject),
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
    });
});
