import React from 'react';
import {createStore} from 'redux';
import {fromJS} from 'immutable';
import connectedPerson from '../../../../../../lib/shared/views/resources/persons/individual/component';
import * as duck from '../../../../../../lib/shared/views/resources/persons/individual/duck';

import {assert} from 'chai';
import {shallow} from 'enzyme';
import {string, url, simpleObject, integer} from '@travi/any';
import sinon from 'sinon';

suite('connected person component', () => {
    const ConnectedPerson = connectedPerson(React);
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(duck, 'loadPerson');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that redux state is mapped to props', () => {
        const
            resource = {
                id: string(),
                displayName: string(),
                name: {
                    first: string(),
                    last: string()
                },
                links: simpleObject(),
                thumbnail: url()
            },

            wrapper = shallow(<ConnectedPerson store={createStore(() => fromJS({legacy: {resource}}))}/>),
            person = wrapper.prop('person');

        assert.equal(person.id, resource.id);
        assert.equal(person.displayName, resource.displayName);
        assert.deepEqual(person.name, resource.name);
        assert.deepEqual(person.links, resource.links);
        assert.equal(person.avatar, resource.thumbnail);
    });

    test('that the `fetch` hook returns a promise', () => {
        const
            id = integer(),
            person = simpleObject(),
            dispatch = sinon.stub(),
            promise = simpleObject();
        duck.loadPerson.withArgs(id).returns(person);
        dispatch.withArgs(person).returns(promise);

        assert.equal(ConnectedPerson['@@redial-hooks'].fetch({params: {id}, dispatch}), promise);
    });
});
