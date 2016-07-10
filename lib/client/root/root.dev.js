import React from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import DevTools from '../../shared/views/dev/dev-tools';

export default function Root({store, routes}) {
    return (
        <Provider store={store}>
            <div>
                <Router history={browserHistory} children={routes}/>
                <DevTools />
            </div>
        </Provider>
    );
}
