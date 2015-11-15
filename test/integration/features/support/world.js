'use strict';

const
    path = require('path'),
    loadApi = require(path.join(__dirname, '../../../../lib/server/app.js'));

module.exports.World = function World() {
    this.makeRequestTo = (url, callback) => {
        loadApi.then((server) => {
            server.inject({
                method: 'GET',
                url,
                headers: {
                    'Accept': this.mime
                }
            }, (response) => {
                this.serverResponse = response;

                callback();
            });
        });
    };
};
