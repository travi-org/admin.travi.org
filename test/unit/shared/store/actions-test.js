'use strict';

const
    assert = require('chai').assert,
    immutable = require('immutable'),
    any = require('../../../helpers/any'),
    actions = require('../../../../lib/shared/store/actions');

suite('reducer actions', () => {
    test('that primary nav is added to the state', () => {
        const primaryNav = any.listOf(any.simpleObject);

        assert.equal(
            actions.setPrimaryNav(immutable.Map(), primaryNav),
            immutable.Map({
                primaryNav: immutable.fromJS(primaryNav)
            })
        );
    });
});
