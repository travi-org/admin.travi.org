import React from 'react';
import {createStore} from 'redux';
import {fromJS} from 'immutable';
import connectedWrap from '../../../../../../lib/shared/views/theme/wrap/component';
import * as duck from '../../../../../../lib/shared/views/theme/wrap/duck';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {listOf, simpleObject} from '@travi/any';

suite('connected wrapper component', () => {
    const ConnectedWrap = connectedWrap(React);
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(duck, 'loadNav');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that redux state is mapped to props', () => {
        const
            nav = listOf(simpleObject),

            wrapper = shallow(<ConnectedWrap store={createStore(() => fromJS({wrap: {nav}}))}/>),
            navProp = wrapper.prop('primaryNav');

        assert.deepEqual(navProp, nav);
    });

    test('that the `fetch` hook returns a promise', () => {
        const
            nav = listOf(simpleObject),
            state = simpleObject(),
            dispatch = sinon.stub(),
            promise = simpleObject();
        duck.loadNav.withArgs(state).returns(nav);
        dispatch.withArgs(nav).returns(promise);

        assert.equal(ConnectedWrap['@@redial-hooks'].fetch({params: {}, dispatch, state}), promise);
    });
});
