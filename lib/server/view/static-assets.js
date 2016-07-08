exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/resources/{param*}',
        handler: {
            directory: {
                path: 'resources'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/favicon.ico',
        handler: {
            file: {
                path: 'node_modules/@travi/travi.org-theme/img/favicon.ico'
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'static-assets'
};
