import redial from 'redial';
import {browserHistory, match} from 'react-router';
import {getRoutes} from '../shared/routes';

if (module.hot) {
  module.hot.accept('../shared/routes');
}

export default function ({dispatch, getState}) {
  browserHistory.listen(location => {
    match({routes: getRoutes(), location}, (ignoredError, redirectLocation, renderProps) => {
      redial.trigger('fetch', renderProps.components, {
        params: renderProps.params,
        state: getState(),
        dispatch
      });
    });
  });
}
