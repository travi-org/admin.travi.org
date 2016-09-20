/*global window */

import redial from 'redial';
import {browserHistory, match} from 'react-router';
import {getRoutes} from '../shared/routes';

if (module.hot) {
    module.hot.accept('../shared/routes');
}

export function addHistoryListener({dispatch, getState}) {
    browserHistory.listen((location) => {
        match({routes: getRoutes(), location}, (err, redirectLocation, renderProps) => {
            if (window.__INITIAL_STATE__) {
                window.__INITIAL_STATE__ = null;
            } else {
                redial.trigger('fetch', renderProps.components, {
                    params: renderProps.params,
                    state: getState(),
                    dispatch
                });
            }
        });
    });
}
