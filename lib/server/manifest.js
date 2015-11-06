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
        './routes': {},
        './core/landing': {},
        './view/static-assets': {},
        './view/rendering-handler': {}
    }
};
