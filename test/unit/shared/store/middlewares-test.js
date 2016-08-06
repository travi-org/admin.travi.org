/*global window */
import * as redux from 'redux';
import {getComposed} from '../../../../lib/shared/store/middlewares';
import fetchMiddleware from '../../../../lib/shared/store/fetch-middleware';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

suite('redux middlewares', () => {
    let sandbox;
    const
        appliedFetch = any.simpleObject(),
        composed = any.simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(redux, 'compose');
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
