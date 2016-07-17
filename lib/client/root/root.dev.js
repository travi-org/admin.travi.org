import React from 'react';
import {Provider} from 'react-redux';
import DevTools from '../../shared/views/dev/dev-tools';

export default function Root({store, children}) {
    return (
        <Provider store={store}>
            <div>
                {children}
                <DevTools />
            </div>
        </Provider>
    );
}
