/*global module*/
module.exports = function (grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        config: {
            webPageTestApiToken: process.env.WEB_PAGE_TEST_API_TOKEN
        }
    });

    grunt.registerTask('pact-consumer', 'consumer driven contract', function () {
        var extendGruntPlugin = require('extend-grunt-plugin'),
            path = require('path'),
            Pact = require('pact-consumer-js-dsl'),

            pactServicePort = 1234,
            mockService = Pact.mockService({
                consumer: 'travi.org-admin',
                provider: 'travi-api',
                port: pactServicePort,
                done: function (err) {
                    refute.defined(err);
                }
            });

        var options = this.options({
            pactServicePort: pactServicePort,
            pactDir: 'tmp'
        });

        extendGruntPlugin(grunt, require('grunt-shell-spawn/tasks/shell'), {
            'shell.pactServerStart': {
                command: 'bundle exec pact-mock-service start -p ' +
                options.pactServicePort + ' -l ' +
                options.pactDir + '/pact.log --pact-dir ' +
                options.pactDir + '/pacts',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: true
                }
            },
            'shell.pactServerStop': {
                command: 'bundle exec pact-mock-service stop -p ' + options.pactServicePort,
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: false
                }
            }
        });


        //wait for server to start. there's got to be a better way to handle this, but it may be tough since the startup gets backgrounded
        extendGruntPlugin(grunt, require('grunt-wait/tasks/wait'), {
            'wait.pact': {
                options: {
                    delay: 1000
                }
            }
        });

        grunt.task.registerTask('pact-tests', 'pact tests', function () {
            // Setup interaction when calling the root url with GET
            mockService
                .given('the root url')
                .uponReceiving('a GET request for all data')
                .withRequest('get', '/')
                .willRespondWith({
                    status: 200,
                    body: [
                        {id: 92834, text: 'random text here.'},
                        {id: 23453, text: 'more text'}
                    ]
                });

            // Setup interaction when calling the root url with POST
            mockService
                .given('the root url')
                .uponReceiving('a POST request with json data')
                .withRequest('post', '/', null, { text: 'different text' })
                .willRespondWith({
                    status: 200,
                    body: Math.floor(Math.random() * 1000000) // Random 6 digit ID
                });

            mockService.setup(function (error) {
                if (error) {
                    console.warn('Pact wasn\'t able set up the interactions: \n' + error);
                }
            });

            mockService.verifyAndWrite(function (error) {
                if (error) {
                    console.warn('Pact wasn\'t able to verify the interactions: \n' + error);
                } else {
                    console.log('Pact verified and written.');
                }
            });
        });

        grunt.task.run('shell:pactServerStart', 'wait:pact', 'pact-tests', 'shell:pactServerStop');
    });
};
