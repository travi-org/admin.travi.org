import nock from 'nock';
import {url} from '@travi/any';
import loadApi from '../../../../lib/server/app.js';

const
    DOMAIN = 'api.travi.org',
    HTTP_SUCCESS = 200;

export function World() {
    this.apiResponseLinks = {};

    this.makeRequestTo = (address, callback) => {
        loadApi.then((server) => {
            server.inject({
                method: 'GET',
                url: address,
                headers: {
                    'Accept': this.mime
                }
            }).then((response) => {
                this.serverResponse = response;

                callback();
            });
        }).catch(callback);
    };

    this.getResponseBody = () => this.serverResponse.payload;

    this.apiResponseShouldIncludeLinkFor = (link) => {
        this.apiResponseLinks[link.rel] = link.path;
    };

    function buildHalLink(href) {
        return {href};
    }

    function buildApiResponseLinks() {
        const links = {
            'self': buildHalLink(url({domain: DOMAIN}))
        };

        let rel;

        for (rel in this.apiResponseLinks) {
            if (this.apiResponseLinks.hasOwnProperty(rel)) {
                links[rel] = buildHalLink(this.apiResponseLinks[rel]);
            }
        }

        this.availableResourceTypes.forEach((type) => {
            links[type] = buildHalLink(url());
        });

        return links;
    }

    this.stubApiCatalogCall = () => {
        nock('https://api.travi.org')
            .log(console.log)   //eslint-disable-line no-console
            .get('/')
            .times(3)
            .reply(
                HTTP_SUCCESS,
                {_links: buildApiResponseLinks.call(this)},
                {'Content-Type': 'application/hal+json'}
            );
    };
}
