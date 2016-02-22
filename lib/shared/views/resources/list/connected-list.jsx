'use strict';

const
    reactRedux = require('react-redux'),
    maybeResourceList = require('./maybe-list.jsx');

module.exports = (React) => reactRedux.connect((state) => {
    const resourceType = state.get('resourceType');

    return {
        resources: state.get(resourceType).toJS(),
        resourceType
    };
})(maybeResourceList(React));
