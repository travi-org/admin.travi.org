'use strict';

var any = require('./any');

any.resource = function () {
    return {};
};

any.resources = {
    rides: function () {
        return any.string();
    },
    users: function () {
        return {
            id: any.string(),
            'first-name': any.string(),
            'last-name': any.string(),
            avatar: any.url()
        };
    }
};

module.exports = any;
