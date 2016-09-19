/*global window */

import React from 'react';
import {Router, browserHistory} from 'react-router';
import {getRoutes} from '../shared/routes';
import Root from '../shared/views/root/root';
import ErrorPage from '../shared/views/errors/page';
import ga from 'react-ga';

function trackPageView() {
    ga.pageview(window.location.pathname);
}

function determineContent() {       //eslint-disable-line react/display-name
    if (window.__BOOM__) {
        return <ErrorPage statusCode={window.__BOOM__.statusCode} />;
    }

    return <Router children={getRoutes()} history={browserHistory} onUpdate={trackPageView} />;
}

export default function Wrapper({store}) {
    return <Root store={store}>{determineContent()}</Root>;
}
