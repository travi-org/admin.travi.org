const director = require('director'),
    router = require('../../../lib/client/router');

suite('client-side router', function () {
    teardown(function () {
        director.Router.restore();
    });

    test('that the router exists', function () {
        const instance = {
            init: sinon.spy()
        };

        sinon.stub(director, 'Router').returns(instance);

        router.init();

        sinon.assert.calledOnce(instance.init);
    });
});
