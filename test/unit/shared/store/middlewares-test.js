/*global window */
import * as redux from 'redux';
import {getComposed} from '../../../../lib/shared/store/middlewares';
import * as fetchMiddlewareFactory from '@travi/redux-fetch-middleware';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

suite('redux middlewares', () => {
    let sandbox;
    const
        appliedFetch = any.simpleObject(),
        composed = any.simpleObject();

    setup(() => {
        const fetchMiddleware = any.simpleObject();

        sandbox = sinon.sandbox.create();

        sandbox.stub(redux, 'compose');
        sandbox.stub(fetchMiddlewareFactory, 'default').returns(fetchMiddleware);
        sandbox.stub(redux, 'applyMiddleware').withArgs(fetchMiddleware).returns(appliedFetch);
    });

    teardown(() => {
        sandbox.restore();

        if (window.devToolsExtension) {
            delete window.devToolsExtension;
        }
    });

    test('that the middlewares are composed', () => {
        redux.compose.withArgs(appliedFetch).returns(composed);

        assert.equal(getComposed(), composed);
    });

    test('that devtools browser extension is initialized if present', () => {
        const enhancer = any.simpleObject();
        window.devToolsExtension = sinon.stub().returns(enhancer);
        redux.compose.withArgs(appliedFetch, enhancer).returns(composed);

        assert.equal(getComposed(), composed);
    });
});
