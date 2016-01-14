'use strict';

const
    defaultPort = 3333,
    port = process.env.PORT || defaultPort;

module.exports = {
    'connections': [{port}],
    'registrations': [
        {plugin: 'inert'},
        {plugin: 'vision'},
        {
            plugin: {
                register: 'visionary',
                options: {
                    'engines': {'mustache': 'hapi-mustache'},
                    'path': './lib/shared/views'
                }
            }
        },
        {
            plugin: {
                register: 'good',
                options: {
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
                }
            }
        },
        {plugin: './core/landing'},
        {plugin: './view/static-assets'},
        {plugin: './resources/routes'},
        {plugin: './view/rendering-handler'}
    ]
};
