'use strict';

const router = require('../../../lib/client/router');

suite('client-side app', function () {
    teardown(function () {
        router.init.restore();
    });

    test('that app exists', function () {
        sinon.stub(router, 'init');

        require('../../../lib/client/app.js');

        sinon.assert.calledOnce(router.init);
    });
});
