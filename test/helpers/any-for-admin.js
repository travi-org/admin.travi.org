'use strict';

var any = require('./any');

any.resource = function () {
    return {};
};

any.resources = {
    ride: function () {
        return any.string();
    },
    user: function () {
        return {
            id: any.string(),
            'first-name': any.string(),
            'last-name': any.string(),
            avatar: any.url()
        };
    }
};

module.exports = any;
