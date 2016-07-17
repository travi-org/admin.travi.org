if ('development' === process.env.NODE_ENV) {
    module.exports = require('./root.dev.js');
} else {
    module.exports = require('./root.prod.js');
}
