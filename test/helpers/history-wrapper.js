import React from 'react';
import {createMemoryHistory} from 'react-router';

export default class HistoryWrapper extends React.Component {
  getChildContext() {
    const historyInstance = createMemoryHistory();

    historyInstance.isActive = () => undefined;
    historyInstance.setRouteLeaveHook = () => undefined;

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
