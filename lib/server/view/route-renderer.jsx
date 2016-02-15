'use strict';

const
    React = require('react'), //eslint-disable-line no-unused-vars
    ReactDOMServer = require('react-dom/server'),
    reactRouter = require('react-router'),
    Provider = require('react-redux').Provider,
    RouterContext = reactRouter.RouterContext,

    routes = require('./../../shared/routes.jsx'),

    _ = require('lodash');

/*eslint max-params: [2, 4]*/ //TODO: temporary until the transition from async props to redux is complete
function routeTo(url, data, store, callback) {
    function createElement(Component, props) {
        const extended = _.extend({}, data, props);

        return <Component {...extended}/>;
    }

    const history = reactRouter.createMemoryHistory();

    reactRouter.match({routes, location: history.createLocation(url)}, (error, redirectLocation, renderProps) => {
        callback(error, ReactDOMServer.renderToString(
            <Provider store={store}><RouterContext {...renderProps} createElement={createElement} /></Provider>
        ));
    });
}

module.exports = {routeTo};
