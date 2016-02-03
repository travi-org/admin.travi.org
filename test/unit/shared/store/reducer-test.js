'use strict';

const
    immutable = require('immutable'),
    reducer = require('../../../../lib/shared/store/reducer'),
    any = require('../../../helpers/any'),
    assert = require('chai').assert;

suite('reducer', () => {
    test('that state is returned directly without known action', () => {
        const initialState = any.simpleObject();

        assert.equal(reducer(initialState), initialState);
    });

    test('that a default initial state is provided', () => {
        assert.equal(immutable.Map(), reducer());
    });
});
