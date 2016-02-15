'use strict';

const
    React = require('react'),
    reactRouter = require('react-router');

class HistoryWrapper extends React.Component {
    getChildContext() {
        const historyInstance = reactRouter.createMemoryHistory();
        historyInstance.isActive = function () {};

        return {
            router: historyInstance
        };
    }

    render() {
        return this.props.children;
    }
}

HistoryWrapper.childContextTypes = {
    router: React.PropTypes.object
};

module.exports = HistoryWrapper;
