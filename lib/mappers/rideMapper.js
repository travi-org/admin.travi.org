'use strict';

var _ = require('lodash');

function mapToView(ride) {
    return {
        id: ride.id,
        displayName: ride.nickname,
        _links: {}
    };
}

function mapToViewList(list) {
    return _.map(list, mapToView);
}

module.exports = {
    mapToView: mapToView,
    mapToViewList: mapToViewList
};
