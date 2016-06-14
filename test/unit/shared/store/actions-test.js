import {assert} from 'chai';
import immutable from 'immutable';
import {listOf, string, simpleObject} from '@travi/any';
import {setPrimaryNav, setResource, setResources} from '../../../../lib/shared/store/actions';

suite('reducer actions', () => {
    test('that primary nav is added to the state', () => {
        const primaryNav = listOf(simpleObject);

        assert.equal(
            setPrimaryNav(immutable.Map(), primaryNav),
            immutable.Map({
                primaryNav: immutable.fromJS(primaryNav)
            })
        );
    });

    test('that resource is set on the state', () => {
        const resource = simpleObject();

        assert.equal(
            setResource(immutable.Map(), resource),
            immutable.Map({
                resource: immutable.fromJS(resource)
            })
        );
    });

    test('that resources are merged into the state', () => {
        const
            type = string(),
            resources = listOf(simpleObject),
            initialState = immutable.fromJS({
                [string]: listOf(string)
            });

        assert.equal(
            setResources(initialState, type, resources),
            initialState.merge({
                resourceType: type,
                [type]: immutable.fromJS(resources)
            })
        );
    });
});
