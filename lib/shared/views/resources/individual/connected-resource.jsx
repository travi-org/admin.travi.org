'use strict';

const
    reactRedux = require('react-redux'),
    resource = require('./resource.jsx');

module.exports = (React) => reactRedux.connect((state) => {
    return {
        resource: state.get('resource').toJS()
    };
})(resource(React));
