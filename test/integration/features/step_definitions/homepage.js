import {assert} from 'referee';

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
            primaryNav: this.availableResourceTypes.map((type) => {
                return {
                    text: type,
                    path: `/${type}`
                };
            })
        }));

        done();
    });

};
