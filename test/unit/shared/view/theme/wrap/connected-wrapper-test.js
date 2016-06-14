import React from 'react';
import * as reactRedux from 'react-redux';
import Immutable from 'immutable';
import * as components from '@travi/admin.travi.org-components';
import connectedWrap from '../../../../../../lib/shared/views/theme/wrap/connected-wrap';

import sinon from 'sinon';
import {assert} from 'chai';
import {listOf, simpleObject} from '@travi/any';

suite('connected wrapper component', () => {
    let sandbox;
    const Wrap = simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(reactRedux, 'connect');
        sandbox.stub(components, 'createWrap').withArgs(React).returns(Wrap);
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
            primaryNav = listOf(simpleObject),
            mapStateToProps = reactRedux.connect.getCall(0).args[0],

            props = mapStateToProps(Immutable.fromJS({primaryNav}));

        assert.deepEqual(props.primaryNav, primaryNav);
    });
});
