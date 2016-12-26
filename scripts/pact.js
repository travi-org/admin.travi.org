import pactServer from '@pact-foundation/pact-node';
import pact from 'pact';
import {assert} from 'chai';
import JsonHalAdapter from 'traverson-hal';
import apiResources from '../lib/server/resources/travi-api-resources';

const consumer = 'travi.org-admin';
const provider = 'travi-api';
const port = 5678;

const server = pactServer.createServer({
  port,     // Port number that the server runs on, defaults to 1234
  // host: <String>,     // Host on which to bind the server on, defaults to 'localhost'
  log: 'logs/pact-verification.txt',
  // ssl: <Boolean>,     // Create a self-signed SSL cert to run the server over HTTPS , defaults to 'false'
  // cors: <Boolean>,    // Allow CORS OPTION requests to be accepted, defaults to 'false'
  dir: 'pacts',
  spec: 2,     // The pact specification version to use when writing pact contracts, defaults to '1'
  consumer, // The name of the consumer to be written to the pact contracts, defaults to none
  provider  // The name of the provider to be written to the pact contracts, defaults to none
});

server.start().then(() => {
  const expectedLinks = {
    self: {href: 'https://api.travi.org/'},
    rides: {href: 'https://api.travi.org/rides'},
    persons: {href: 'https://api.travi.org/persons'}
  };
  const providerInstance = pact({consumer, provider, port});

  function verifyAndWrite() {
    apiResources.setHost(`http://localhost:${port}`);
    apiResources.getLinksFor('', (err, links) => {
      if (err) {
        console.error(err);     // eslint-disable-line no-console
      } else {
        assert.deepEqual(links, expectedLinks);
      }

      providerInstance.finalize().then(() => server.delete());
    });
  }

  providerInstance.addInteraction({
    // state: 'no token',
    uponReceiving: 'a request for the catalog',
    withRequest: {
      method: 'GET',
      path: '/',
      headers: {Accept: JsonHalAdapter.mediaType}
    },
    willRespondWith: {
      status: 200,
      headers: {'Content-Type': JsonHalAdapter.mediaType},
      body: {_links: expectedLinks}
    }
  }).then(verifyAndWrite);
}).catch(e => {
  console.error(e);                   // eslint-disable-line no-console
  pactServer.removeAllServers();
});
