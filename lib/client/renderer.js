/*global window document */

import React from 'react';
import dom from 'react-dom';
import {Router, browserHistory} from 'react-router';
import ga from 'react-ga';
import Root from '../shared/views/root/root';
import {getRoutes} from '../shared/routes';
import ErrorPage from '../shared/views/errors/page';

function trackPageView() {
    ga.pageview(window.location.pathname);
}

function determineContent() {       //eslint-disable-line react/display-name
    if (window.__BOOM__) {
        return <ErrorPage statusCode={window.__BOOM__.statusCode} />;
    }

    return <Router children={getRoutes()} history={browserHistory} onUpdate={trackPageView} />;
}

export function remountContent(store, gaKey) {
    ga.initialize(gaKey);

    dom.render(
        <Root store={store}>{determineContent()}</Root>,
        document.getElementById('wrap')
    );
}
