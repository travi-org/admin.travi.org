/*global refute */
/*eslint filenames/filenames: 0 */

'use strict';

module.exports = function (grunt) {

    const
        pact = 'tmp/pacts/travi.org-admin-travi-api.json',
        config = {
            webPageTestApiToken: process.env.WEB_PAGE_TEST_API_TOKEN,
            pactBrokerPassword: process.env.PACT_BROKER_PASSWORD
        };

    if (grunt.file.exists(pact)) {
        config.pact = grunt.file.readJSON(pact);
    }

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        config,
        jitGrunt: {
            staticMappings: {
                mochacov: 'grunt-mocha-cov',
                cucumberjs: 'grunt-cucumber',
                bower: 'grunt-bower-task',
                scsslint: 'grunt-scss-lint'
            }
        }
    });


    grunt.registerTask('warning-exit', 'Call process.exit', () => {
        process.exit(3);
    });

    grunt.registerTask('pact-consumer', 'consumer driven contract', function () {
        const
            extendGruntPlugin = require('extend-grunt-plugin'),
            Pact = require('pact-consumer-js-dsl'),

            pactServicePort = 1234,
            mockService = Pact.mockService({
                consumer: 'travi.org-admin',
                provider: 'travi-api',
                port: pactServicePort,
                done(err) {
                    refute.defined(err);
                }
            }),
            options = this.options({    //eslint-disable-line no-invalid-this
                pactServicePort,
                pactDir: 'tmp'
            });

        extendGruntPlugin(grunt, require('grunt-shell-spawn/tasks/shell'), {
            'shell.pactServerStart': {
                command: `bundle exec pact-mock-service start -p ${options.pactServicePort}`
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
            mockService
                .given('the root url')
                .uponReceiving('a GET request for the api catalog')
                .withRequest('get', '/')
                .willRespondWith({
                    status: 200,
                    body: [
                        {id: 92834, text: 'random text here.'},
                        {id: 23453, text: 'more text'}
                    ]
                });

            mockService.setup((error) => {
                if (error) {
                    console.warn(       //eslint-disable-line no-console
                        `Pact wasn't able set up the interactions:
                        ${error}`
                    );
                }
            });

            mockService.run(() => {}, (runComplete) => {
                require('./lib/server/resources/travi-api-resources').getLinksFor('', runComplete);
            });

            mockService.verifyAndWrite((error) => {
                if (error) {
                    console.warn(       //eslint-disable-line no-console
                        `Pact wasn't able to verify the interactions:
                        ${error}`
                    );
                } else {
                    console.log('Pact verified and written.');      //eslint-disable-line no-console
                }
            });
        });

        grunt.warn = grunt.fail.warn = function (warning) {
            grunt.log.warn(warning);
            grunt.task.run('shell:pactServerStop', 'warning-exit');
        };

        grunt.task.run('shell:pactServerStart', 'wait:pact', 'pact-tests', 'shell:pactServerStop');
    });
};
