'use strict';

var renderer = require('../../lib/renderer.js'),
    any = require('../helpers/any');

require('setup-referee-sinon/globals');

suite('content-negotiating renderer', function () {
    test('that html is rendered if content type is text/html', function () {
        var viewName = any.string(),
            data = { foo: 'bar' },
            reply = {
                view: sinon.spy()
            };

        renderer.render(viewName, data, {
            headers: {
                accept: 'text/html'
            }
        }, reply);

        assert.calledWith(reply.view, viewName, data);
    });

    test('that json is returned when content type is not text/html', function () {
        var reply = sinon.spy(),
            data = { foo: 'bar' };

        renderer.render(null, data, {
            headers: {
                accept: 'foo/bar'
            }
        }, reply);

        assert.calledWith(reply, data);
    });
});
