import pact from '@pact-foundation/pact-node';
import {resolve} from 'path';

require('dotenv').config({silent: true});

pact.publishPacts({
  pactFilesOrDirs: [resolve(__dirname, '../pacts/travi.org-admin-travi-api.json')],
  pactBroker: 'https://pact-api.travi.org/',
  pactBrokerUsername: process.env.PACT_BROKER_USER,
  pactBrokerPassword: process.env.PACT_BROKER_PASSWORD,
  consumerVersion: process.env.TRAVIS_COMMIT
}).catch(e => console.error(e));      // eslint-disable-line no-console
