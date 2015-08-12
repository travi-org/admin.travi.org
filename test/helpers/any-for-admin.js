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
            nickname: any.string(),
            _links: {}
        };
    },
    user: function () {
        return {
            id: any.string(),
            'first-name': any.string(),
            'last-name': any.string(),
            avatar: {
                src: any.url(),
                size: any.int()
            },
            _links: {}
        };
    }
};

module.exports = any;
