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
            person = {
                id: string(),
                displayName: string(),
                name: {
                    first: string(),
                    last: string()
                },
                links: simpleObject(),
                thumbnail: url()
            },

            wrapper = shallow(<ConnectedPerson store={createStore(() => fromJS({person: {person}}))}/>),
            personProp = wrapper.prop('person');

        assert.equal(personProp.id, person.id);
        assert.equal(personProp.displayName, person.displayName);
        assert.deepEqual(personProp.name, person.name);
        assert.deepEqual(personProp.links, person.links);
        assert.equal(personProp.avatar, person.thumbnail);
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
