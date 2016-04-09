import React from 'react';
import {createMemoryHistory} from 'react-router';

class HistoryWrapper extends React.Component {
    getChildContext() {
        const historyInstance = createMemoryHistory();
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
