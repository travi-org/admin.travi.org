'use strict';

const
    React = require('react'),
    reduxDevTools = require('redux-devtools'),
    LogMonitor = require('redux-devtools-log-monitor').default;

module.exports = reduxDevTools.createDevTools(
    <LogMonitor theme="solarized" />
);
