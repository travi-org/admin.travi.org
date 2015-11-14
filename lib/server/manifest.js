'use strict';

const port = process.env.PORT || 3333;

module.exports = {
    'connections': [{port}],
    'plugins': {
        'inert': {},
        'vision': {},
        'visionary': {
            'engines': { 'mustache': 'hapi-mustache' },
            'path': './lib/shared/views'
        },
        'good': {
            'reporters': [
                {
                    'reporter': require('good-console'),
                    'events': {
                        log: '*',
                        response: '*',
                        error: '*'
                    }
                }
            ]
        },
        './core/landing': {},
        './view/static-assets': {},
        './resources/routes': {},
        './view/rendering-handler': {}
    }
};
