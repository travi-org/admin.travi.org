import React from 'react';
import {createStore} from 'redux';
import {fromJS} from 'immutable';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {listOf, simpleObject} from '@travi/any';
import ConnectedWrap from '../../../../../../src/shared/views/theme/wrap/component';
import * as duck from '../../../../../../src/shared/views/theme/wrap/duck';

suite('connected wrapper component', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(duck, 'loadNav');
  });

  teardown(() => {
    sandbox.restore();
  });

  test('that redux state is mapped to props', () => {
    const nav = listOf(simpleObject);

    const wrapper = shallow(<ConnectedWrap store={createStore(() => fromJS({wrap: {nav}}))} />);
    const wrap = wrapper.find('Wrap');
    const navProp = wrap.prop('primaryNav');

    assert.deepEqual(navProp, nav);
  });

  test('that the `fetch` hook returns a promise', () => {
    const nav = listOf(simpleObject);
    const state = simpleObject();
    const dispatch = sinon.stub();
    const promise = simpleObject();
    duck.loadNav.withArgs(state).returns(nav);
    dispatch.withArgs(nav).returns(promise);

    assert.equal(ConnectedWrap['@@redial-hooks'].fetch({params: {}, dispatch, state}), promise);
  });
});
