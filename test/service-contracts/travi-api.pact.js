require('babel-register');
const
    assert = require('chai').assert,

    expectedLinks = {
        self: {href: 'https://api.travi.org/'},
        rides: {href: 'https://api.travi.org/rides'},
        users: {href: 'https://api.travi.org/users'}
    };

function logError(err) {
    console.log(err);   //eslint-disable-line no-console
    console.trace();    //eslint-disable-line no-console
}

module.exports = function (server) {
    const apiResources = require('../../lib/server/resources/travi-api-resources');
    //console.log('reasources loaded');
    apiResources.setHost(`http://localhost:${server.options.port}`);

    //console.log('ready to define');

    //const mockService = Pact.mockService({
    //    consumer: 'travi.org-admin',
    //    provider: 'travi-api',
    //    port: MOCK_SERVICE_PORT,
    //    done(err) {
    //        if (err) {
    //            console.log(err);   //eslint-disable-line no-console
    //            console.trace();    //eslint-disable-line no-console
    //        }
    //    }
    //});

    server
        .given('the root url')
        .uponReceiving('a GET request for the api catalog')
        .withRequest('get', '/')
        .willRespondWith({
            status: 200,
            body: {
                _links: expectedLinks
            }
        });

    //console.log('defined');

    server.run(
        () => {
            //console.log('read to verify');
            server.verifyAndWrite((error) => {
                if (error) {
                    console.error(       //eslint-disable-line no-console
                        `Pact wasn't able to verify the interactions:
                    ${error}`
                    );
                } else {
                    console.log('Pact verified and written.');      //eslint-disable-line no-console
                }
            });
        },
        (runComplete) => {
            //console.log('run complete');
            apiResources.getLinksFor('', (err, links) => {
                if (err) {
                    logError(err);
                } else {
                    assert.deepEqual(links, expectedLinks);
                }

                runComplete();
            });
        }
    );
};
