if ('production' === process.env.NODE_ENV) {
    module.exports = require('./configure.prod');
} else {
    module.exports = require('./configure.dev');
}
