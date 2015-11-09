'use strict';

const _ = require('lodash');

function mapToView(resource) {
    resource.links = {};

    return resource;
}

function mapToViewList(list) {
    return _.map(list, mapToView);
}

module.exports = {
    mapToView,
    mapToViewList
};
