'use strict';

const
    React = require('react'),
    history = require('history');

class HistoryWrapper extends React.Component {
    getChildContext() {
        return {
            history: history.createMemoryHistory()
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
