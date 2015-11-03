'use strict';

var stampit = require('stampit'),
    baseView = require('./base-mapper');

module.exports = stampit
    .props({resourceType: 'users'})
    .methods({
        mapToView: function mapToView(user) {
            return {
                id: user.id,
                displayName: user['first-name'] + ' ' + user['last-name'],
                thumbnail: user.avatar,
                links: this.mapLinks(user)
            };
        }
    })
    .compose(baseView)();
