'use strict';

const any = require('./any');

any.resource = function () {
    return {
        id: any.int()
    };
};

any.resources = {
    ride() {
        return {
            id: any.int(),
            nickname: any.string(),
            _links: {}
        };
    },
    user() {
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
