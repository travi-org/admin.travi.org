import React from 'react';
import {createMemoryHistory} from 'react-router';

class HistoryWrapper extends React.Component {
    getChildContext() {
        const historyInstance = createMemoryHistory();

        historyInstance.isActive = function () {};
        historyInstance.setRouteLeaveHook = function () {};

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

export default HistoryWrapper;
