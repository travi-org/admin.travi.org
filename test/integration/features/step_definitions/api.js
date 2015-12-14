'use strict';

const any = require('../../../helpers/any');

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Before(function () {
        this.availableResourceTypes = [];
    });

    this.Given(/^user has no api privileges$/, function (callback) {
        this.stubApiCatalogCall();

        callback();
    });

    this.Given(/^user has api privileges$/, function (callback) {
        this.availableResourceTypes = any.listOf(any.string, {
            min: 1
        });

        this.stubApiCatalogCall();

        callback();
    });
};
