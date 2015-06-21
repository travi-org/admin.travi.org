'use strict';

var _ = require('lodash');

module.exports = {
    mapToViewList: function (list) {
        return _.map(list, function (ride, index) {
            return {
                id: index + 1,
                displayName: ride
            };
        });
    }
};
