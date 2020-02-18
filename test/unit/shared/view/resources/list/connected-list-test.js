import React from 'react';
import {createStore} from 'redux';
import {fromJS} from 'immutable';
import sinon from 'sinon';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {simpleObject, string, listOf, boolean, integer} from '@travi/any';
import ConnectedList from '../../../../../../src/shared/views/resources/list/connected-list';
import * as duck from '../../../../../../src/shared/views/resources/list/duck';

suite('connected list component', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(duck, 'loadResources');
  });

  teardown(() => sandbox.restore());

  test('that redux state is mapped to props', () => {
    const list = listOf(() => ({...simpleObject(), id: integer(), displayName: string()}));
    const type = string();
    const loading = boolean();

    const wrapper = shallow(<ConnectedList store={createStore(() => fromJS({resources: {list, type, loading}}))} />);
    const listComponent = wrapper.find('MaybeList');

    assert.deepEqual(listComponent.prop('resources'), list);
    assert.equal(listComponent.prop('resourceType'), type);
    assert.equal(listComponent.prop('loading'), loading);
  });

  test('that the `fetch` hook returns a promise', () => {
    const type = string();
    const person = simpleObject();
    const dispatch = sinon.stub();
    const promise = simpleObject();
    duck.loadResources.withArgs(type).returns(person);
    dispatch.withArgs(person).returns(promise);

    assert.equal(ConnectedList['@@redial-hooks'].fetch({params: {type}, dispatch}), promise);
  });
});
