/*global window document */
import dom from 'react-dom';
import React from 'react';
import {Router, browserHistory} from 'react-router';
import routesFactory from '../shared/routes';
import configureStore from '../shared/store/configure';
import hydrator from './route-hydrator';
import Root from '../shared/views/root/root';

const
    store = configureStore(JSON.parse(window.__INITIAL_STATE__)),
    routes = routesFactory(hydrator(store).hydrate);

dom.render(
    <Root store={store}>
        <Router history={browserHistory} children={routes} />
    </Root>,
    document.getElementById('wrap')
);
