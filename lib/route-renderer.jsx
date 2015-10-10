const
    React = require('react'),
    reactRouter = require('react-router');

function routeTo(location, callback) {
    reactRouter.match(null, function () {
        callback(null, React.renderToString());
    });
}

module.exports = {
    routeTo: routeTo
};
