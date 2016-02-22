'use strict';

const
    React = require('react'),
    reactRedux = require('react-redux'),
    Immutable = require('immutable'),

    sinon = require('sinon'),
    assert = require('chai').assert,
    proxyquire = require('proxyquire'),
    any = require('../../../../../../helpers/any');

suite('connected wrapper component', () => {
    let sandbox;
    const
        ResourceList = any.simpleObject(),
        connectedList = proxyquire('../../../../../../../lib/shared/views/resources/list/connected-list.jsx', {
            './maybe-list.jsx': sinon.stub().withArgs(React).returns(ResourceList)
        });

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
