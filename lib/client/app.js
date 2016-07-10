/*global window document */
import dom from 'react-dom';
import React from 'react';
import routesFactory from '../shared/routes';
import configureStore from '../shared/store/configure';
import hydrator from './route-hydrator';
import Root from './root/root';

const
    store = configureStore(JSON.parse(window.__INITIAL_STATE__)),
    routes = routesFactory(hydrator(store).hydrate);

dom.render(
    <Root store={store} routes={routes} />,
    document.getElementById('wrap')
);
