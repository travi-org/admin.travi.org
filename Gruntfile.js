/*eslint filenames/match-regex: 0 */
require('babel-register');

module.exports = function (grunt) {

    const
        pact = 'tmp/pacts/travi.org-admin-travi-api.json',
        config = {
            webPageTestApiToken: process.env.WEB_PAGE_TEST_API_TOKEN,
            pactBrokerPassword: process.env.PACT_BROKER_PASSWORD,
            ghToken: process.env.GH_TOKEN
        },
        EXIT_CODE = 3;

    if (grunt.file.exists(pact)) {
        config.pact = grunt.file.readJSON(pact);
    }

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        config,
        jitGrunt: {
            staticMappings: {
                cucumberjs: 'grunt-cucumber'
            }
        }
    });

    grunt.event.on('coverage', (lcov, done) => {
        require('coveralls').handleInput(lcov, (err) => {
            if (err) {
                return done(err);
            }
            return done();
        });
    });


    grunt.registerTask('warning-exit', 'Call process.exit', () => {
        process.exit(EXIT_CODE);
    });

    function logError(err) {
        console.log(err);   //eslint-disable-line no-console
        console.trace();    //eslint-disable-line no-console
    }

    grunt.registerTask('pact-consumer', 'consumer driven contract', function () {
        const
            extendGruntPlugin = require('extend-grunt-plugin'),
            Pact = require('pact-consumer-js-dsl'),
            assert = require('chai').assert,

            pactServicePort = 1234,
            mockService = Pact.mockService({
                consumer: 'travi.org-admin',
                provider: 'travi-api',
                port: pactServicePort,
                done(err) {
                    if (err) {
                        logError(err);
                    }
                }
            }),
            options = this.options({    //eslint-disable-line no-invalid-this
                pactServicePort,
                pactDir: 'tmp'
            });

        extendGruntPlugin(grunt, require('grunt-shell-spawn/tasks/shell'), {
            'shell.pactServerStart': {
                command: `bundle exec pact-mock-service start -p ${options.pactServicePort}`
                    + ' --pact-specification-version 2.0.0'
                    + ` -l ${options.pactDir}/pact.log --pact-dir ${options.pactDir}/pacts`,
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: true
                }
            },
            'shell.pactServerStop': {
                command: `bundle exec pact-mock-service stop -p ${options.pactServicePort}`,
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: false
                }
            }
        });


        //wait for server to start. there's got to be a better way to handle this, but it may be tough since the
        // startup gets backgrounded
        extendGruntPlugin(grunt, require('grunt-wait/tasks/wait'), {
            'wait.pact': {
                options: {
                    delay: 1000
                }
            }
        });

        grunt.task.registerTask('pact-tests', 'pact tests', () => {
            const expectedLinks = {
                self: {
                    href: 'https://api.travi.org/'
                },
                rides: {
                    href: 'https://api.travi.org/rides'
                },
                persons: {
                    href: 'https://api.travi.org/persons'
                }
            };

            mockService
                .given('the root url')
                .uponReceiving('a GET request for the api catalog')
                .withRequest('get', '/')
                .willRespondWith({
                    status: 200,
                    body: {
                        _links: expectedLinks
                    }
                });


            mockService.run(() => {
                mockService.verifyAndWrite((error) => {
                    if (error) {
                        console.error(       //eslint-disable-line no-console
                            `Pact wasn't able to verify the interactions:
                        ${error}`
                        );
                    } else {
                        console.log('Pact verified and written.');      //eslint-disable-line no-console
                    }
                });
            }, (runComplete) => {
                const apiResources = require('./lib/server/resources/travi-api-resources');
                apiResources.setHost(`http://localhost:${options.pactServicePort}`);
                apiResources.getLinksFor('', (err, links) => {
                    if (err) {
                        logError(err);
                    } else {
                        assert.deepEqual(links, expectedLinks);
                    }

                    runComplete();
                });
            });
        });

        grunt.warn = grunt.fail.warn = function (warning) {
            grunt.log.warn(warning);
            grunt.task.run('shell:pactServerStop', 'warning-exit');
        };

        grunt.task.run('shell:pactServerStart', 'wait:pact', 'pact-tests', 'shell:pactServerStop');
    });
};
