import React from 'react';
import {createStore} from 'redux';
import {fromJS} from 'immutable';
import ConnectedList from '../../../../../../src/shared/views/resources/list/connected-list';
import * as duck from '../../../../../../src/shared/views/resources/list/duck';

import sinon from 'sinon';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {simpleObject, string, listOf, boolean, integer} from '@travi/any';

suite('connected list component', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(duck, 'loadResources');
    });

    teardown(() => sandbox.restore());

    test('that redux state is mapped to props', () => {
        const
            list = listOf(() => ({...simpleObject(), id: integer(), displayName: string()})),
            type = string(),
            loading = boolean(),

            wrapper = shallow(<ConnectedList store={createStore(() => fromJS({resources: {list, type, loading}}))}/>);

        assert.deepEqual(wrapper.prop('resources'), list);
        assert.equal(wrapper.prop('resourceType'), type);
        assert.equal(wrapper.prop('loading'), loading);
    });

    test('that the `fetch` hook returns a promise', () => {
        const
            type = string(),
            person = simpleObject(),
            dispatch = sinon.stub(),
            promise = simpleObject();
        duck.loadResources.withArgs(type).returns(person);
        dispatch.withArgs(person).returns(promise);

        assert.equal(ConnectedList['@@redial-hooks'].fetch({params: {type}, dispatch}), promise);
    });

});
