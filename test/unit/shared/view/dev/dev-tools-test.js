import any from '@travi/any';
import proxyquire from 'proxyquire';
import React from 'react';
import LogMonitor from 'redux-devtools-log-monitor';
import sinon from 'sinon';
import {assert} from 'chai';

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
            }).default;
        React.createElement.withArgs(LogMonitor, {theme: 'solarized'}).returns(MonitorComponent);

        assert.equal(DevTools, Tools);
    });
});
