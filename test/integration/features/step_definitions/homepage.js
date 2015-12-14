'use strict';

const
    assert = require('referee').assert,
    _ = require('lodash');
require('setup-referee-sinon/globals');

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^the homepage is loaded$/, function (callback) {
        this.makeRequestTo('/', callback);
    });

    this.Then(/^no resources are listed$/, function (done) {
        assert.equals(this.getResponseBody(), JSON.stringify({primaryNav: []}));

        done();
    });

    this.Then(/^top level resources are listed$/, function (done) {
        assert.equals(this.getResponseBody(), JSON.stringify({
            primaryNav: _.map(this.availableResourceTypes, (type) => {
                return {
                    text: type,
                    path: `/${type}`
                };
            })
        }));

        done();
    });

};
