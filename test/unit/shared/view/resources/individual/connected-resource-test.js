import React from 'react';
import {createStore} from 'redux';
import {fromJS} from 'immutable';
import ConnectedResource from '../../../../../../src/shared/views/resources/individual/connected-resource';
import * as duck from '../../../../../../src/shared/views/resources/individual/duck';

import sinon from 'sinon';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {simpleObject, integer, string, boolean} from '@travi/any';

suite('connected resource component', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(duck, 'loadResource');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that redux state is mapped to props', () => {
        const
            resource = simpleObject(),
            loading = boolean(),

            wrapper = shallow(<ConnectedResource store={createStore(() => fromJS({resource: {resource, loading}}))}/>);

        assert.deepEqual(wrapper.prop('resource'), resource);
        assert.equal(wrapper.prop('loading'), loading);
    });

    test('that the `fetch` hook returns a promise', () => {
        const
            type = string(),
            id = integer(),
            person = simpleObject(),
            dispatch = sinon.stub(),
            promise = simpleObject();
        duck.loadResource.withArgs(type, id).returns(person);
        dispatch.withArgs(person).returns(promise);

        assert.equal(ConnectedResource['@@redial-hooks'].fetch({params: {type, id}, dispatch}), promise);
    });
});
