/* eslint filenames/match-regex: 0 */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
process.env.BABEL_ENV = 'node';
require('babel-register');

module.exports = grunt => {
  const config = {
    webPageTestApiToken: process.env.WEB_PAGE_TEST_API_TOKEN,
    pactBrokerPassword: process.env.PACT_BROKER_PASSWORD,
    ghToken: process.env.GH_TOKEN
  };

  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    config,
    jitGrunt: {}
  });
};
