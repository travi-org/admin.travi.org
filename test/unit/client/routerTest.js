var any = require('../../helpers/any'),
    assert = require('chai').assert;

suite('client-side router', function () {
    test('that the router exists', function () {
        var instance = any.simpleObject();

        sinon.stub(require('director'), 'Router').returns(instance);

        var router = require('../../../lib/client/router');

        assert.equal(router, instance);
    });
});
