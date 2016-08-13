/*global window */

import redial from 'redial';
import {browserHistory, match} from 'react-router';

export function addHistoryListener(routes, {dispatch, getState}) {
    browserHistory.listen((location) => {
        match({routes, location}, (err, redirectLocation, renderProps) => {
            if (window.__INITIAL_STATE__) {
                window.__INITIAL_STATE__ = null;
            } else {
                redial.trigger('fetch', renderProps.components, {params: renderProps.params, dispatch, getState});
            }
        });
    });
}
