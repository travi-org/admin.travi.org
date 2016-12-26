import pact from '@pact-foundation/pact-node';
import {resolve} from 'path';

require('dotenv').config({silent: true});

pact.publishPacts({
  pactUrls: [resolve(__dirname, '../pacts/travi.org-admin-travi-api.json')],
  pactBroker: 'https://pact-api.travi.org/',
  pactBrokerUsername: process.env.PACT_BROKER_USER,
  pactBrokerPassword: process.env.PACT_BROKER_PASSWORD,
  consumerVersion: '0.0.3'
  //  tags: <Array>,                  // An array of Strings to tag the Pacts being published. Optional
}).catch(e => console.error(e));      // eslint-disable-line no-console
