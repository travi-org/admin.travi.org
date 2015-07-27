'use strict';

var any = require('./any');

any.resource = function () {
    return {
        id: any.int()
    };
};

any.resources = {
    ride: function () {
        return {
            id: any.int(),
            nickname: any.string()
        };
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
