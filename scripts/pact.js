import pact from 'pact';
import {assert} from 'chai';
import JsonHalAdapter from 'traverson-hal';
import {getLinksFor, setHost} from '../src/server/resources/travi-api-resources';

const consumer = 'travi.org-admin';
const provider = 'travi-api';
const port = 5670;

const providerInstance = pact({consumer, provider, port});

function verifyAndWrite() {
  setHost(`http://localhost:${port}`);
  getLinksFor('', (err, links) => {
    if (err) {
      console.error(err);     // eslint-disable-line no-console
    } else {
      assert.deepEqual(links, {
        self: {href: '/'},
        rides: {href: '/rides'},
        persons: {href: '/persons'}
      });
      providerInstance.verify();
    }

    providerInstance.finalize();
  });
}

providerInstance.setup().then(() => {
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
      body: {
        _links: {
          self: {href: '/'},
          rides: {href: '/rides'},
          persons: {href: '/persons'}
        }
      }
    }
  }).then(verifyAndWrite);
}).catch((...args) => {
  process.exitCode = 1;
  console.error(...args);       // eslint-disable-line no-console
});
