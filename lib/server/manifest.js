const
    defaultPort = 3333,
    port = process.env.PORT || defaultPort;

export default {
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
                    ops: {
                        interval: 1000
                    },
                    'reporters': {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ log: '*', response: '*', error: '*' }]
                            },
                            {
                                module: 'good-console'
                            },
                            'stdout'
                        ]
                    }
                }
            }
        },
        {plugin: './core/landing'},
        {plugin: './view/static-assets'},
        {plugin: './resources/routes'},
        {plugin: './view/rendering-handler'}
    ]
};
