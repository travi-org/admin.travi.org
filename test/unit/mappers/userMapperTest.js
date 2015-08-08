'use strict';

var mapper = require('../../../lib/mappers/userMapper'),

    any = require('../../helpers/any-for-admin');

suite('user mapper', function () {
    test('that user resources mapped to view list', function () {
        var user = any.resources.user();

        assert.equals(
            [{
                id: user.id,
                displayName: user['first-name'] + ' ' + user['last-name'],
                thumbnail: user.avatar,
                links: {}
            }],
            mapper.mapToViewList([user])
        );
    });

    test('that user mapped to view', function () {
        var user = any.resources.user();

        assert.equals(
            {
                id: user.id,
                displayName: user['first-name'] + ' ' + user['last-name'],
                thumbnail: user.avatar,
                links: {}
            },
            mapper.mapToView(user)
        );

    });
});
