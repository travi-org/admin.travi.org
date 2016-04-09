import React from 'react';
import * as reactRedux from 'react-redux';
import Immutable from 'immutable';

import sinon from 'sinon';
import {assert} from 'chai';
import proxyquire from 'proxyquire';
import any from '../../../../../helpers/any';

suite('connected wrapper component', () => {
    let sandbox;
    const
        Wrap = any.simpleObject(),
        connectedWrap = proxyquire('../../../../../../lib/shared/views/theme/wrap/connected-wrap.jsx', {
            './wrap.jsx': sinon.stub().withArgs(React).returns(Wrap)
        });

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(reactRedux, 'connect');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the Wrap component is connected to the redux store', () => {
        const connectToComponent = sinon.stub();
        reactRedux.connect.returns(connectToComponent);

        connectedWrap(React);

        assert.calledWith(connectToComponent, Wrap);
    });

    test('that redux state is mapped to props', () => {
        reactRedux.connect.returns(sinon.stub());
        connectedWrap(React);
        const
            primaryNav = any.listOf(any.simpleObject),
            mapStateToProps = reactRedux.connect.getCall(0).args[0],

            props = mapStateToProps(Immutable.fromJS({primaryNav}));

        assert.deepEqual(props.primaryNav, primaryNav);
    });
});
