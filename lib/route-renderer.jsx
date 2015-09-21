const React = require('react');

function routeTo(location, callback) {
    callback(null, React.renderToString());
}

module.exports = {
    routeTo: routeTo
};
