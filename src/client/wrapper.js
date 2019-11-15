/* eslint no-underscore-dangle: ["error", { "allow": ["__BOOM__"] }] */
import React from 'react';
import {shape, func} from 'prop-types';
import {Router, browserHistory} from 'react-router';
import ga from 'react-ga';
import {getRoutes} from '../shared/routes';
import Root from '../shared/views/root/root';
import ErrorPage from '../shared/views/errors/page';

function trackPageView() {
  ga.pageview(window.location.pathname);
}

function determineContent() {
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
  store: shape({
    subscribe: func,
    dispatch: func,
    getState: func
  }).isRequired
};
