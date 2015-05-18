'use strict';

var traviApiResources = require('./traviApiResources');

function getListOf(resourceType, callback) {
    traviApiResources.getListOf(resourceType, function (err, list) {
        callback(null, list);
    });
}

module.exports = {
    getListOf: getListOf
};
