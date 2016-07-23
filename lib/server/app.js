require('newrelic');

import Glue from 'glue';
import manifest from './manifest';
import {define as defineDependencies} from './dependencies';

const composeOptions = {
    relativeTo: __dirname
};

require.extensions['.scss'] = () => undefined;

export default new Promise((resolve, reject) => {
    Glue.compose(manifest, composeOptions, (err, server) => {
        if (err) {
            reject(err);
            throw err;
        }

        defineDependencies();

        server.start(() => {
            console.log(    //eslint-disable-line no-console
                `Server started at http://${server.info.address}:${server.info.port}`
            );
            resolve(server);
        });
    });
}).catch((err) => {
    console.error(err);     //eslint-disable-line no-console
    console.trace();        //eslint-disable-line no-console
});
