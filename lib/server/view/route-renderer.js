import React from 'react';
import {renderToString} from 'react-dom/server';
import redial from 'redial';
import Boom from 'boom';
import {RouterContext, match, createMemoryHistory} from 'react-router';
import Root from '../../shared/views/root/root';

import {getRoutes} from './../../shared/routes';

export function routeTo(url, store, callback) {
    const history = createMemoryHistory();

    match({routes: getRoutes(), location: history.createLocation(url)}, (error, redirectLocation, renderProps) => {
        if (error) {
            callback(error);
        } else if (renderProps.components.map((component) => component.displayName).includes('NotFound')) {
            callback(Boom.notFound('Invalid react-router route'));
        } else {
            redial.trigger('fetch', renderProps.components, {
                params: renderProps.params,
                dispatch: store.dispatch,
                state: store.getState()
            }).then(() => {
                callback(null, renderToString(
                    <Root store={store}>
                        <RouterContext {...renderProps} />
                    </Root>
                ));
            }).catch((e) => callback(e));
        }
    });
}
