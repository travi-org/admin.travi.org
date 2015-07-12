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
        var extendGruntPlugin = require('extend-grunt-plugin');

        var options = this.options({
            pactServicePort: 1234,
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
                    async: true
                }
            }
        });

        grunt.task.run('shell:pactServerStart');

        //run tests

        grunt.task.run('shell:pactServerStop');
    });
};
