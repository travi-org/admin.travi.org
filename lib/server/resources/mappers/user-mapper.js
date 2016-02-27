'use strict';

const
    stampit = require('stampit'),
    baseView = require('./base-mapper');

module.exports = stampit
    .props({resourceType: 'users'})
    .methods({
        mapToView: function mapToView(user) {
            return {
                id: user.id,
                displayName: `${user['first-name']} ${user['last-name']}`,
                links: this.mapLinks(user),
                name: {
                    first: user['first-name'],
                    last: user['last-name']
                },
                thumbnail: user.avatar
            };
        }
    })
    .compose(baseView)();
