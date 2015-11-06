const port = process.env.PORT || 3333;

module.exports = {
    'connections': [{port: port}],
    'plugins': {
        'inert': {},
        'vision': {},
        'visionary': {
            'engines': { 'mustache': 'hapi-mustache' },
            'path': './lib/views'
        },
        './core/landing': {},
        './view/static-assets': {},
        './resources/routes': {},
        './view/rendering-handler': {}
    }
};
