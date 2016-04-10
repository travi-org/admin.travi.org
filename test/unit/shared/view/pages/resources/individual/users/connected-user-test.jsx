import React from 'react';
import * as reactRedux from 'react-redux';
import Immutable from 'immutable';

import sinon from 'sinon';
import {assert} from 'chai';
import proxyquire from 'proxyquire';
import any from '../../../../../../../helpers/any';

suite('connected wrapper component', () => {
    let sandbox;
    const
        Resource = any.simpleObject(),
        connectedResource = proxyquire(
            '../../../../../../../../lib/shared/views/resources/individual/users/connected-user.jsx',
            {'./user.jsx': {default: sinon.stub().withArgs(React).returns(Resource)}}
        ).default;

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
            resource = {
                id: any.string(),
                displayName: any.string(),
                name: {
                    first: any.string(),
                    last: any.string()
                },
                links: any.simpleObject(),
                thumbnail: any.url()
            },
            mapStateToProps = reactRedux.connect.getCall(0).args[0],

            {user} = mapStateToProps(Immutable.fromJS({resource}));

        assert.equal(user.id, resource.id);
        assert.equal(user.displayName, resource.displayName);
        assert.deepEqual(user.name, resource.name);
        assert.deepEqual(user.links, resource.links);
        assert.equal(user.avatar, resource.thumbnail);
    });
});
