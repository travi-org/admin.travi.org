import React from 'react';
import {shape} from 'prop-types';
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
    const {children} = this.props;

    return children;
  }
}

HistoryWrapper.childContextTypes = {
  router: shape
};
