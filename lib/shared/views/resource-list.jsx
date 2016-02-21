'use strict';

const
    connect = require('react-redux').connect,
    maybeResourceList = require('./resources/list/maybe-list.jsx');

module.exports = (React) => connect((state) => {
    const resourceType = state.get('resourceType');

    return {
        resources: state.get(resourceType).toJS(),
        resourceType
    };
})(maybeResourceList(React));
