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
        self: {href: 'https://api.travi.org/'},
        rides: {href: 'https://api.travi.org/rides'},
        persons: {href: 'https://api.travi.org/persons'}
      });
      providerInstance.verify();
    }

    providerInstance.finalize();
  });
}

providerInstance.setup().then(() => {
  const urlPattern = '(?i)\\b((?:[a-z][\\w-]+:(?:/{1,3}|[a-z0-9%])|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}/)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:\'".,<>?«»“”‘’]))';   // eslint-disable-line max-len

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
          self: {
            href: pact.Matchers.term({
              matcher: urlPattern,
              generate: 'https://api.travi.org/'
            })
          },
          rides: {
            href: pact.Matchers.term({
              matcher: urlPattern,
              generate: 'https://api.travi.org/rides'
            })
          },
          persons: {
            href: pact.Matchers.term({
              matcher: urlPattern,
              generate: 'https://api.travi.org/persons'
            })
          }
        }
      }
    }
  }).then(verifyAndWrite);
}).catch((...args) => {
  process.exitCode = 1;
  console.error(...args);       // eslint-disable-line no-console
});
