import React from 'react';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from 'material-ui';

export default function Root({store, children}) {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
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
  }).isRequired
};
