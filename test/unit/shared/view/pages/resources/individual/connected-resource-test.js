import React from 'react';
import * as reactRedux from 'react-redux';
import Immutable from 'immutable';
import * as components from '@travi/admin.travi.org-components';
import connectedResource from '../../../../../../../lib/shared/views/resources/individual/connected-resource';

import sinon from 'sinon';
import {assert} from 'chai';
import {simpleObject} from '@travi/any';

suite('connected resource component', () => {
    let sandbox;
    const Resource = simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(reactRedux, 'connect');
        sandbox.stub(components, 'createResource').withArgs(React).returns(Resource);
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the Resource component is connected to the redux store', () => {
        const connectToComponent = sinon.stub();
        reactRedux.connect.returns(connectToComponent);

        connectedResource(React);

        assert.calledWith(connectToComponent, Resource);
    });

    test('that redux state is mapped to props', () => {
        reactRedux.connect.returns(sinon.stub());
        connectedResource(React);
        const
            resource = simpleObject(),
            mapStateToProps = reactRedux.connect.getCall(0).args[0],

            props = mapStateToProps(Immutable.fromJS({resource}));

        assert.deepEqual(props.resource, resource);
    });
});
