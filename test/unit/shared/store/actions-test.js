import {assert} from 'chai';
import immutable from 'immutable';
import any from '../../../helpers/any';
import actions from '../../../../lib/shared/store/actions';

suite('reducer actions', () => {
    test('that primary nav is added to the state', () => {
        const primaryNav = any.listOf(any.simpleObject);

        assert.equal(
            actions.setPrimaryNav(immutable.Map(), primaryNav),
            immutable.Map({
                primaryNav: immutable.fromJS(primaryNav)
            })
        );
    });

    test('that resource is set on the state', () => {
        const resource = any.simpleObject();

        assert.equal(
            actions.setResource(immutable.Map(), resource),
            immutable.Map({
                resource: immutable.fromJS(resource)
            })
        );
    });

    test('that resources are merged into the state', () => {
        const
            type = any.string(),
            resources = any.listOf(any.simpleObject),
            initialState = immutable.fromJS({
                [any.string]: any.listOf(any.string)
            });

        assert.equal(
            actions.setResources(initialState, type, resources),
            initialState.merge({
                resourceType: type,
                [type]: immutable.fromJS(resources)
            })
        );
    });
});
