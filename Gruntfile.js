/*eslint filenames/match-regex: 0 */
process.env.BABEL_ENV = 'node';
require('babel-register');

module.exports = function (grunt) {
    const config = {
        webPageTestApiToken: process.env.WEB_PAGE_TEST_API_TOKEN,
        pactBrokerPassword: process.env.PACT_BROKER_PASSWORD,
        ghToken: process.env.GH_TOKEN
    };

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
};
