module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^a request is made to "([^"]*)"$/, function (path, callback) {
        this.makeRequestTo(path, callback);
    });
};
