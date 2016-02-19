'use strict';

const
    any = require('../../../../helpers/any'),
    proxyquire = require('proxyquire'),
    React = require('react'),
    LogMonitor = require('redux-devtools-log-monitor').default,
    sinon = require('sinon'),
    assert = require('chai').assert;

suite('redux dev-tools', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(React, 'createElement');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that constructed dev-tools are exported', () => {
        const
            Tools = any.simpleObject(),
            MonitorComponent = any.simpleObject(),
            DevTools = proxyquire('../../../../../lib/shared/views/dev/dev-tools', {
                'redux-devtools': {
                    createDevTools: sinon.stub().withArgs(MonitorComponent).returns(Tools)
                }
            });
        React.createElement.withArgs(LogMonitor, {theme: 'solarized'}).returns(MonitorComponent);

        assert.equal(DevTools, Tools);
    });
});
