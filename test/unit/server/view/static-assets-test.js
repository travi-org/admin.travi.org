'use strict';

const assets = require('../../../../lib/server/view/static-assets');

suite('static assets', function () {
    test('that the plugin is defined', function () {
        assert.equals(assets.register.attributes, {
            name: 'static-assets'
        });
    });

    test('that the static asset routes are configured', function () {
        const
            next = sinon.spy(),
            route = sinon.spy();

        assets.register({route}, null, next);

        assert.calledOnce(next);
        assert.calledWith(route, {
            method: 'GET',
            path: '/resources/{param*}',
            handler: {
                directory: {
                    path: 'resources'
                }
            }
        });
        assert.calledWith(route, {
            method: 'GET',
            path: '/favicon.ico',
            handler: {
                file: {
                    path: 'bower_components/travi.org-theme/img/favicon.ico'
                }
            }
        });
    });
});
