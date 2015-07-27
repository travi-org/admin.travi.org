'use strict';

var _ = require('lodash');

module.exports = {
    mapToViewList: function (list) {
        return _.map(list, function (ride) {
            return {
                id: ride.id,
                displayName: ride.nickname
            };
        });
    }
};
