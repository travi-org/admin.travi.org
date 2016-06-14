import React from 'react';
import * as reactRedux from 'react-redux';
import Immutable from 'immutable';
import * as components from '@travi/admin.travi.org-components';
import connectedList from '../../../../../../../lib/shared/views/resources/list/connected-list';

import sinon from 'sinon';
import {assert} from 'chai';
import {simpleObject, string} from '@travi/any';

suite('connected wrapper component', () => {
    let sandbox;
    const ResourceList = simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(reactRedux, 'connect');
        sandbox.stub(components, 'createMaybeList').withArgs(React).returns(ResourceList);
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
            resources = simpleObject(),
            resourceType = string(),
            mapStateToProps = reactRedux.connect.getCall(0).args[0],

            props = mapStateToProps(Immutable.fromJS({
                [resourceType]: resources,
                resourceType
            }));

        assert.equal(props.resourceType, resourceType);
        assert.deepEqual(props.resources, resources);
    });
});
