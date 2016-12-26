/* global window */
/* eslint no-underscore-dangle: ["error", { "allow": ["__BOOM__"] }]*/
import React from 'react';
import {Router, browserHistory} from 'react-router';
import ga from 'react-ga';
import {getRoutes} from '../shared/routes';
import Root from '../shared/views/root/root';
import ErrorPage from '../shared/views/errors/page';

function trackPageView() {
  ga.pageview(window.location.pathname);
}

function determineContent() {       // eslint-disable-line react/display-name
  if (window.__BOOM__) {
    return <ErrorPage statusCode={window.__BOOM__.statusCode} />;
  }

  return <Router history={browserHistory} onUpdate={trackPageView}>{getRoutes()}</Router>;
}

export default function Wrapper({store}) {
  return <Root store={store}>{determineContent()}</Root>;
}

Wrapper.displayName = 'Wrapper';

Wrapper.propTypes = {
  store: React.PropTypes.shape({
    subscribe: React.PropTypes.func,
    dispatch: React.PropTypes.func,
    getState: React.PropTypes.func
  }).isRequired
};
