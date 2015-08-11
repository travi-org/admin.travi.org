'use strict';

var _ = require('lodash');

function mapLinks(user) {
    var links = {};

    if (user._links.self) {
        links.self = {
            href: '/users/' + user.id
        };
    }

    return links;
}

function mapToView(user) {
    return {
        id: user.id,
        displayName: user['first-name'] + ' ' + user['last-name'],
        thumbnail: user.avatar,
        links: mapLinks(user)
    };
}

function mapToViewList(list) {
    return _.map(list, mapToView);
}

module.exports = {
    mapToView: mapToView,
    mapToViewList: mapToViewList
};
