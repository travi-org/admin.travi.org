'use strict';

var _ = require('lodash');

function mapToView(user) {
    return {
        id: user.id,
        displayName: user['first-name'] + ' ' + user['last-name'],
        thumbnail: user.avatar,
        links: {}
    };
}
function mapToViewList(list) {
    return _.map(list, mapToView);
}

module.exports = {
    mapToView: mapToView,
    mapToViewList: mapToViewList
};
