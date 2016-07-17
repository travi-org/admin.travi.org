import React from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, createMemoryHistory} from 'react-router';
import {Provider} from 'react-redux';

import routesFactory from './../../shared/routes';

function routeTo(url, store, callback) {
    const
        history = createMemoryHistory(),
        routes = routesFactory(() => {});

    match({routes, location: history.createLocation(url)}, (error, redirectLocation, renderProps) => {
        callback(error, renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        ));
    });
}

export {routeTo};
