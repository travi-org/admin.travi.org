import React from 'react';
import * as reactRedux from 'react-redux';
import Immutable from 'immutable';

import sinon from 'sinon';
import {assert} from 'chai';
import proxyquire from 'proxyquire';
import any from '@travi/any';

suite('connected wrapper component', () => {
    let sandbox;
    const
        ResourceList = any.simpleObject(),
        connectedList = proxyquire('../../../../../../../lib/shared/views/resources/list/connected-list.jsx', {
            '@travi/admin.travi.org-components/lib/resources/list/maybe-list': {
                default: sinon.stub().withArgs(React).returns(ResourceList)
            }
        }).default;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(reactRedux, 'connect');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the Resource component is connected to the redux store', () => {
        const connectToComponent = sinon.stub();
        reactRedux.connect.returns(connectToComponent);

        connectedList(React);

        assert.calledWith(connectToComponent, ResourceList);
    });

    test('that redux state is mapped to props', () => {
        reactRedux.connect.returns(sinon.stub());
        connectedList(React);
        const
            resources = any.simpleObject(),
            resourceType = any.string(),
            mapStateToProps = reactRedux.connect.getCall(0).args[0],

            props = mapStateToProps(Immutable.fromJS({
                [resourceType]: resources,
                resourceType
            }));

        assert.equal(props.resourceType, resourceType);
        assert.deepEqual(props.resources, resources);
    });
});
