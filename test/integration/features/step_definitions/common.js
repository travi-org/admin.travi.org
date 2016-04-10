import nock from 'nock';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Before(() => {
        nock.disableNetConnect();
        this.mime = 'application/json';
    });

    this.After(function () {
        nock.enableNetConnect();
        nock.cleanAll();
        this.mime = null;
        this.serverResponse = null;
    });
};
