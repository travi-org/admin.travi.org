import 'newrelic';
import Glue from 'glue';
import manifest from './manifest';
import {define as defineDependencies} from './dependencies';

const composeOptions = {relativeTo: __dirname};

require.extensions['.scss'] = () => undefined;

export default Glue.compose(manifest, composeOptions)
  .then(server => {
    defineDependencies();

    return server.start().then(() => {
      server.log(['startup'], `Server started at http://${server.info.address}:${server.info.port}`);
      return server;
    });
  }).catch(err => {
    console.error(err);     // eslint-disable-line no-console
    console.trace();        // eslint-disable-line no-console
  });
