import React from 'react';
import {createStore} from 'redux';
import * as reactRedux from 'react-redux';
import {fromJS} from 'immutable';
import * as components from '@travi/admin.travi.org-components';
import connectedResource from '../../../../../../../lib/shared/views/resources/individual/connected-resource';
import * as duck from '../../../../../../../lib/shared/views/resources/individual/duck';

import sinon from 'sinon';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {simpleObject, integer, string} from '@travi/any';

suite('connected resource component', () => {
    const ConnectedResource = connectedResource(React);
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

            wrapper = shallow(<ConnectedResource store={createStore(() => fromJS({legacy: {resource}}))}/>),
            personProp = wrapper.prop('resource');

        assert.deepEqual(personProp, resource);
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
