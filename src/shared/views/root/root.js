import React from 'react';
import {node, shape, func, string} from 'prop-types';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default function Root({store, children, request}) {
  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme({...request && {userAgent: request.headers['user-agent']}})}>
        {children}
      </MuiThemeProvider>
    </Provider>
  );
}

Root.displayName = 'Root';

Root.propTypes = {
  children: node.isRequired,
  store: shape({
    subscribe: func,
    dispatch: func,
    getState: func
  }).isRequired,
  request: shape({
    headers: shape({
      'user-agent': string
    })
  })
};
