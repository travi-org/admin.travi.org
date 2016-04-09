/*global window document */
import dom from 'react-dom';
import React from 'react';
import {Router, browserHistory as history} from 'react-router';
import {Provider} from 'react-redux';
import routesFactory from '../shared/routes.jsx';
import configureStore from '../shared/store/configure';
import hydrator from './route-hydrator';

const
    store = configureStore(JSON.parse(window.__INITIAL_STATE__)),
    routes = routesFactory(hydrator(store).hydrate);

dom.render(
    <Provider store={store}>
        <Router history={history} children={routes} />
    </Provider>,
    document.getElementById('wrap')
);
