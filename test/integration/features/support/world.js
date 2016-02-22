'use strict';

require('babel-register');

const
    path = require('path'),
    nock = require('nock'),
    any = require('../../../helpers/any'),
    loadApi = require(path.join(__dirname, '../../../../lib/server/app.js')),

    HOST = 'https://api.travi.org',
    HTTP_SUCCESS = 200;

module.exports.World = function World() {
    this.apiResponseLinks = {};

    this.makeRequestTo = (url, callback) => {
        loadApi.then((server) => {
            server.inject({
                method: 'GET',
                url,
                headers: {
                    'Accept': this.mime
                }
            }, (response) => {
                this.serverResponse = response;

                callback();
            });
        });
    };

    this.getResponseBody = () => this.serverResponse.payload;

    this.apiResponseShouldIncludeLinkFor = (link) => this.apiResponseLinks[link.rel] = link.path;

    function buildHalLink(href) {
        return {href};
    }

    function buildApiResponseLinks() {
        const links = {
            'self': buildHalLink(any.url(HOST))
        };

        let rel;

        for (rel in this.apiResponseLinks) {
            if (this.apiResponseLinks.hasOwnProperty(rel)) {
                links[rel] = buildHalLink(this.apiResponseLinks[rel]);
            }
        }

        this.availableResourceTypes.forEach((type) => {
            links[type] = buildHalLink(any.url());
        });

        return links;
    }

    this.stubApiCatalogCall = () => {
        nock('https://api.travi.org')
            .log(console.log)   //eslint-disable-line no-console
            .get('/')
            .times(2)
            .reply(
            HTTP_SUCCESS,
            {_links: buildApiResponseLinks.call(this)},
            {'Content-Type': 'application/hal+json'}
        );
    };
};
