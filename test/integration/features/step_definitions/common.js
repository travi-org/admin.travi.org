import nock from 'nock';
import loadApi from '../../../../lib/server/app.js';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Before((scenario, callback) => {
        nock.disableNetConnect();
        this.mime = 'application/json';

        loadApi.then(() => callback());
    });

    this.After(function () {
        nock.enableNetConnect();
        nock.cleanAll();
        this.mime = null;
        this.serverResponse = null;
    });
};
