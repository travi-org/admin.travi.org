import nock from 'nock';
import {url} from '@travi/any';
import {OK} from 'http-status-codes';

const DOMAIN = 'api.travi.org';

export function World() {
  this.apiResponseLinks = {};

  this.makeRequestTo = (address, callback) => {
    this.server.inject({
      method: 'GET',
      url: address,
      headers: {
        Accept: this.mime
      }
    }).then(response => {
      this.serverResponse = response;

      callback();
    }).catch(callback);
  };

  this.getResponseBody = () => this.serverResponse.payload;

  this.apiResponseShouldIncludeLinkFor = link => {
    this.apiResponseLinks[link.rel] = link.path;
  };

  function buildHalLink(href) {
    return {href};
  }

  function buildApiResponseLinks() {
    const links = {
      self: buildHalLink(url({domain: DOMAIN})),
      ...Object.entries(this.apiResponseLinks)
        .map(([key, value]) => [key, buildHalLink(value)])
        .reduce((obj, [k, v]) => ({...obj, [k]: v}), {})
    };

    this.availableResourceTypes.forEach(type => {
      links[type] = buildHalLink(url());
    });

    return links;
  }

  this.stubApiCatalogCall = () => {
    nock('https://api.travi.org')
      .get('/')
      .times(3)
      .reply(
        OK,
        {_links: buildApiResponseLinks.call(this)},
        {'Content-Type': 'application/hal+json'}
      );
  };
}
