'use strict';

const
    connect = require('react-redux').connect,
    resource = require('./resources/individual/resource.jsx');

module.exports = (React) => connect((state) => {
    return {
        resource: state.get('resource').toJS()
    };
})(resource(React));
