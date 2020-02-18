import React from 'react';
import {createStore} from 'redux';
import {fromJS} from 'immutable';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {string, url, simpleObject, integer, boolean} from '@travi/any';
import sinon from 'sinon';
import ConnectedPerson from '../../../../../../src/shared/views/persons/individual/component';
import * as duck from '../../../../../../src/shared/views/persons/individual/duck';

suite('connected person component', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(duck, 'loadPerson');
  });

  teardown(() => sandbox.restore());

  test('that redux state is mapped to props', () => {
    const person = {
      id: string(),
      displayName: string(),
      name: {
        first: string(),
        last: string()
      },
      links: simpleObject(),
      thumbnail: url()
    };
    const loading = boolean();

    const wrapper = shallow(<ConnectedPerson store={createStore(() => fromJS({person: {person, loading}}))} />);
    const personComponent = wrapper.find('Person');
    const personProp = personComponent.prop('person');

    assert.equal(personProp.id, person.id);
    assert.equal(personProp.displayName, person.displayName);
    assert.deepEqual(personProp.name, person.name);
    assert.deepEqual(personProp.links, person.links);
    assert.equal(personProp.avatar, person.thumbnail);
    assert.equal(personComponent.prop('loading'), loading);
  });

  test('that the `fetch` hook returns a promise', () => {
    const id = integer();
    const person = simpleObject();
    const dispatch = sinon.stub();
    const promise = simpleObject();
    duck.loadPerson.withArgs(id).returns(person);
    dispatch.withArgs(person).returns(promise);

    assert.equal(ConnectedPerson['@@redial-hooks'].fetch({params: {id}, dispatch}), promise);
  });
});
