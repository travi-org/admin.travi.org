import React from 'react';
import {createStore} from 'redux';
import {fromJS} from 'immutable';
import connectedPerson from '../../../../../../lib/shared/views/resources/persons/individual/component';

import {assert} from 'chai';
import {shallow} from 'enzyme';
import {string, url, simpleObject} from '@travi/any';

suite('connected person component', () => {
    const ConnectedPerson = connectedPerson(React);

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

            wrapper = shallow(<ConnectedPerson store={createStore(() => fromJS({resource}))}/>),
            person = wrapper.prop('person');

        assert.equal(person.id, resource.id);
        assert.equal(person.displayName, resource.displayName);
        assert.deepEqual(person.name, resource.name);
        assert.deepEqual(person.links, resource.links);
        assert.equal(person.avatar, resource.thumbnail);
    });

    test('that the `fetch` hook returns a promise', () => {
        assert.instanceOf(ConnectedPerson['@@redial-hooks'].fetch(), Promise);
    });
});
