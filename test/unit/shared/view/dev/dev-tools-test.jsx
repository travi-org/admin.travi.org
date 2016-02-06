'use strict';

const
    any = require('../../../../helpers/any'),
    proxyquire = require('proxyquire'),
    React = require('React'),
    LogMonitor = require('redux-devtools-log-monitor').default;

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

        assert.equals(DevTools, Tools);
    });
});
