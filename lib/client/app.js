/*global window document */
import dom from 'react-dom';
import React from 'react';
import {Router, browserHistory} from 'react-router';
import ga from 'react-ga';
import routes from '../shared/routes';
import {configureStore} from '../shared/store/create';
import {configure as defineDependencies} from './dependencies';
import {addHistoryListener} from './history-listener';
import Root from '../shared/views/root/root';

const store = configureStore(JSON.parse(window.__INITIAL_STATE__));

defineDependencies();
addHistoryListener(routes, store);
ga.initialize('UA-2890413-9');

function trackPageView() {
    ga.pageview(window.location.pathname);
}

dom.render(
    <Root store={store}>
        <Router history={browserHistory} children={routes} onUpdate={trackPageView} />
    </Root>,
    document.getElementById('wrap')
);
