'use strict';

var _ = require('lodash');

function mapLinks(ride) {
    var links = {};

    if (ride._links.self) {
        links.self = {
            href: '/rides/' + ride.id
        };
    }

    return links;
}

function mapToView(ride) {
    return {
        id: ride.id,
        displayName: ride.nickname,
        links: mapLinks(ride)
    };
}

function mapToViewList(list) {
    return _.map(list, mapToView);
}

module.exports = {
    mapToView: mapToView,
    mapToViewList: mapToViewList
};
