import React from 'react';
import * as reactRedux from 'react-redux';
import Immutable from 'immutable';
import * as components from '@travi/admin.travi.org-components';
import connectedUser from '../../../../../../../../lib/shared/views/resources/individual/persons/connected-person';

import sinon from 'sinon';
import {assert} from 'chai';
import {string, url, simpleObject} from '@travi/any';

suite('connected user component', () => {
    let sandbox;
    const Person = simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(reactRedux, 'connect');
        sandbox.stub(components, 'createPerson').withArgs(React).returns(Person);
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the Resource component is connected to the redux store', () => {
        const connectToComponent = sinon.stub();
        reactRedux.connect.returns(connectToComponent);

        connectedUser(React);

        assert.calledWith(connectToComponent, Person);
    });

    test('that redux state is mapped to props', () => {
        reactRedux.connect.returns(sinon.stub());
        connectedUser(React);
        const
            resource = {
                id: string(),
                displayName: string(),
                name: {
                    first: string(),
                    last: string()
                },
                links: simpleObject(),
                thumbnail: url()
            },
            mapStateToProps = reactRedux.connect.getCall(0).args[0],

            {person} = mapStateToProps(Immutable.fromJS({resource}));

        assert.equal(person.id, resource.id);
        assert.equal(person.displayName, resource.displayName);
        assert.deepEqual(person.name, resource.name);
        assert.deepEqual(person.links, resource.links);
        assert.equal(person.avatar, resource.thumbnail);
    });
});
