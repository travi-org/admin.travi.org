import React from 'react';
import {createStore} from 'redux';
import {fromJS} from 'immutable';
import sinon from 'sinon';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {simpleObject, integer, string, boolean} from '@travi/any';
import ConnectedResource from '../../../../../../src/shared/views/resources/individual/connected-resource';
import * as duck from '../../../../../../src/shared/views/resources/individual/duck';

suite('connected resource component', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(duck, 'loadResource');
  });

  teardown(() => {
    sandbox.restore();
  });

  test('that redux state is mapped to props', () => {
    const resource = simpleObject();
    const loading = boolean();

    const wrapper = shallow(<ConnectedResource store={createStore(() => fromJS({resource: {resource, loading}}))} />);
    const resourceComponent = wrapper.find('Resource');

    assert.deepEqual(resourceComponent.prop('resource'), resource);
    assert.equal(resourceComponent.prop('loading'), loading);
  });

  test('that the `fetch` hook returns a promise', () => {
    const type = string();
    const id = integer();
    const person = simpleObject();
    const dispatch = sinon.stub();
    const promise = simpleObject();
    duck.loadResource.withArgs(type, id).returns(person);
    dispatch.withArgs(person).returns(promise);

    assert.equal(ConnectedResource['@@redial-hooks'].fetch({params: {type, id}, dispatch}), promise);
  });
});
