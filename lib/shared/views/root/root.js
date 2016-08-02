import React from 'react';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Root({store, children}) {
    return (
        <Provider store={store}>
            <MuiThemeProvider>
                {children}
            </MuiThemeProvider>
        </Provider>
    );
}
