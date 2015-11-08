'use strict';

var Glue = require('glue'),
    manifest = require('./manifest');

var composeOptions = {
    relativeTo: __dirname
};

module.exports = new Promise(function (resolve, reject) {
    Glue.compose(manifest, composeOptions, function (err, server) {
        if (err) {
            reject(err);
            throw err;
        }

        server.start(function () {
            console.log(    //eslint-disable-line no-console
                'Server started at http://' + server.info.address + ':' + server.info.port
            );
            resolve(server);
        });
    });
});
