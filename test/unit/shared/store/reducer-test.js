import immutable from 'immutable';
import reducer from '../../../../lib/shared/store/reducer';
import * as actions from '../../../../lib/shared/store/actions';
import {simpleObject} from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';

suite('reducer', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(actions, 'setPrimaryNav');
        sandbox.stub(actions, 'setResources');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that state is returned directly without known action', () => {
        const initialState = simpleObject();

        assert.equal(reducer(initialState, {}), initialState);
    });

    test('that a default initial state is provided', () => {
        assert.equal(reducer(undefined, {}), immutable.Map());
    });

    test('that the setPrimaryNav function is called for the SET_PRIMARY_NAV action', () => {
        const
            initialState = immutable.Map(),
            updatedState = simpleObject(),
            action = {
                type: 'SET_PRIMARY_NAV',
                nav: simpleObject()
            };
        actions.setPrimaryNav.withArgs(initialState, action.nav).returns(updatedState);

        assert.equal(reducer(initialState, action), updatedState);
    });
});
