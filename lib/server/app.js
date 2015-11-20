'use strict';

require('newrelic');

const
    Glue = require('glue'),
    manifest = require('./manifest'),

    composeOptions = {
        relativeTo: __dirname
    };

module.exports = new Promise((resolve, reject) => {
    Glue.compose(manifest, composeOptions, (err, server) => {
        if (err) {
            reject(err);
            throw err;
        }

        server.start(() => {
            console.log(    //eslint-disable-line no-console
                `Server started at http://${server.info.address}:${server.info.port}`
            );
            resolve(server);
        });
    });
});
