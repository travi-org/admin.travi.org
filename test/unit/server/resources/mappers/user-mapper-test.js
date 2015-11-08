'use strict';

const
    mapper = require('../../../../../lib/server/resources/mappers/user-mapper'),
    any = require('../../../../helpers/any-for-admin');

suite('user mapper', function () {
    test('that user resources mapped to view list', function () {
        const user = any.resources.user();

        assert.equals(
            [{
                id: user.id,
                displayName: `${user['first-name']} ${user['last-name']}`,
                thumbnail: user.avatar,
                links: {}
            }],
            mapper.mapToViewList([user])
        );
    });

    test('that user mapped to view', function () {
        const user = any.resources.user();

        assert.equals(
            {
                id: user.id,
                displayName: `${user['first-name']} ${user['last-name']}`,
                thumbnail: user.avatar,
                links: {}
            },
            mapper.mapToView(user)
        );
    });

    test('that self link defined when defined in api', function () {
        const user = any.resources.user();
        user._links.self = any.url();

        assert.equals(
            {
                'self': {
                    href: `/users/${user.id}`
                }
            },
            mapper.mapToView(user).links
        );
    });
});
