'use strict';

const
    React = require('react'),
    history = require('history');

class HistoryWrapper extends React.Component {
    getChildContext() {
        const historyInstance = history.createMemoryHistory();
        historyInstance.isActive = function () {};

        return {
            history: historyInstance
        };
    }

    render() {
        return this.props.children;
    }
}

HistoryWrapper.childContextTypes = {
    history: React.PropTypes.object
};

module.exports = HistoryWrapper;
