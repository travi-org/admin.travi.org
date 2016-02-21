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
        Resource = any.simpleObject(),
        connectedResource = proxyquire(
            '../../../../../../../lib/shared/views/resources/individual/connected-resource.jsx',
            {'./resource.jsx': sinon.stub().withArgs(React).returns(Resource)}
        );

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

        connectedResource(React);

        assert.calledWith(connectToComponent, Resource);
    });

    test('that redux state is mapped to props', () => {
        reactRedux.connect.returns(sinon.stub());
        connectedResource(React);
        const
            resource = any.simpleObject(),
            mapStateToProps = reactRedux.connect.getCall(0).args[0],

            props = mapStateToProps(Immutable.fromJS({resource}));

        assert.deepEqual(props.resource, resource);
    });
});
