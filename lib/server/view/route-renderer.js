import React from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, createMemoryHistory} from 'react-router';
import Root from '../../shared/views/root/root';

import routesFactory from './../../shared/routes';

function routeTo(url, store, callback) {
    const
        history = createMemoryHistory(),
        routes = routesFactory(() => {});

    match({routes, location: history.createLocation(url)}, (error, redirectLocation, renderProps) => {
        callback(error, renderToString(
            <Root store={store}>
                <RouterContext {...renderProps} />
            </Root>
        ));
    });
}

export {routeTo};
