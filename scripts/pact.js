import pact from 'pact';
import {assert} from 'chai';
import JsonHalAdapter from 'traverson-hal';
import apiResources from '../lib/server/resources/travi-api-resources';

const consumer = 'travi.org-admin';
const provider = 'travi-api';
const port = 5670;

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
      body: {_links: expectedLinks}
    }
  }).then(verifyAndWrite);
}).catch(console.error);                  // eslint-disable-line no-console
