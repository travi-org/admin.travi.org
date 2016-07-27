/*global window */

import {addHistoryListener} from '../../../lib/client/history-listener';
import * as reactRouter from 'react-router';
import sinon from 'sinon';
import redial from 'redial';
import {assert} from 'chai';
import any from '@travi/any';

suite('history listener', () => {
    let sandbox;
    const
        location = any.simpleObject(),
        routes = any.simpleObject(),
        components = any.simpleObject(),
        params = any.simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(redial, 'trigger');
        sandbox.stub(reactRouter.browserHistory, 'listen').yields(location);
        sandbox.stub(reactRouter, 'match').withArgs({location, routes}).yields(null, null, {components, params});
    });

    teardown(() => {
        sandbox.restore();
        delete window.__INITIAL_STATE__;
    });

    test('that fetch is triggered for redial when the route changes', () => {
        const dispatch = any.simpleObject();

        addHistoryListener(routes, dispatch);

        assert.calledWith(redial.trigger, 'fetch', components, {dispatch, params});
    });

    test('that fetch is not triggered on the initial page load', () => {
        window.__INITIAL_STATE__ = any.simpleObject();
        const dispatch = any.simpleObject();

        addHistoryListener(routes, dispatch);

        assert.notCalled(redial.trigger);
        assert.isNull(window.__INITIAL_STATE__);
    });
});
