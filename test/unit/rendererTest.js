'use strict';

require('setup-referee-sinon/globals');

var renderToStringStub = sinon.stub(),
    createElementStub = sinon.stub(),
    any = require('../helpers/any'),
    proxyquire = require('proxyquire').noCallThru(),
    viewProxy = require('../../lib/views/viewProxy'),
    reactComponent = any.simpleObject(),
    renderer = proxyquire('../../lib/renderer.js', {
        'react': {
            createElement: createElementStub
        },
        'react-dom/server': {
            renderToString: renderToStringStub
        }
    });

suite('content-negotiating renderer', function () {
    teardown(function () {
        if (viewProxy.getComponent.restore) {
            viewProxy.getComponent.restore();
        }
    });

    test('that html is rendered if content type is text/html', function () {
        var viewName = any.string(),
            data = any.simpleObject(),
            viewRenderedToString = any.string(),
            reactElement = any.simpleObject(),
            reply = {
                view: sinon.spy()
            };
        sinon.stub(viewProxy, 'getComponent').withArgs(viewName).returns(reactComponent);
        createElementStub.withArgs(reactComponent, data).returns(reactComponent);
        renderToStringStub.withArgs(reactElement).returns(viewRenderedToString);

        renderer.render(viewName, data, {
            headers: {
                accept: 'text/html'
            }
        }, reply);

        assert.calledWith(reply.view, 'layout/layout', {
            renderedContent: viewRenderedToString
        });
        proxyquire.callThru();
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
