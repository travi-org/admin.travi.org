import React from 'react';
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
  children: React.PropTypes.node.isRequired,
  store: React.PropTypes.shape({
    subscribe: React.PropTypes.func,
    dispatch: React.PropTypes.func,
    getState: React.PropTypes.func
  }).isRequired,
  request: React.PropTypes.shape({
    headers: React.PropTypes.shape({
      'user-agent': React.PropTypes.string
    })
  })
};
