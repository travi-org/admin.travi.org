'use strict';

var _ = require('lodash');

module.exports = {
    mapToViewList: function (list) {
        return _.map(list, function (user) {
            return {
                id: user.id,
                displayName: user['first-name'] + ' ' + user['last-name'],
                thumbnail: user.avatar
            };
        });
    }
};
