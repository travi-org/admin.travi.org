'use strict';

const
    mapper = require('../../../../../lib/server/resources/mappers/user-mapper'),
    any = require('../../../../helpers/any-for-admin'),
    assert = require('chai').assert;

suite('user mapper', () => {
    test('that user resources mapped to view list', () => {
        const user = any.resources.user();

        assert.deepEqual(
            [{
                id: user.id,
                displayName: `${user['first-name']} ${user['last-name']}`,
                thumbnail: user.avatar,
                links: {}
            }],
            mapper.mapToViewList([user])
        );
    });

    test('that user mapped to view', () => {
        const user = any.resources.user();

        assert.deepEqual(
            {
                id: user.id,
                displayName: `${user['first-name']} ${user['last-name']}`,
                thumbnail: user.avatar,
                links: {}
            },
            mapper.mapToView(user)
        );
    });

    test('that self link defined when defined in api', () => {
        const user = any.resources.user();
        user._links.self = any.url();

        assert.deepEqual(
            {
                'self': {
                    href: `/users/${user.id}`
                }
            },
            mapper.mapToView(user).links
        );
    });
});
