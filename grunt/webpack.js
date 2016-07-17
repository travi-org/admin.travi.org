function loadConfig() {
    const oldEnv = process.env.NODE_ENV;

    process.env.NODE_ENV = 'production';

    const config = require('../webpack.config.js');

    process.env.NODE_ENV = oldEnv;

    return config;
}

module.exports = {
    options: loadConfig(),
    build: {}
};
