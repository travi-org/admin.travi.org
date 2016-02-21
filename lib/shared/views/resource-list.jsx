'use strict';

const connect = require('react-redux').connect;

function maybeResourceList(React) {
    const ResourceList = require('./resources/list/list.jsx')(React);

    return (props) => {
        const
            resources = props.resources,
            resourceType = props.resourceType;

        if (resources.length) {
            return <ResourceList resources={resources} />;
        } else {
            return <p className="alert alert-info">No { resourceType } are available</p>;
        }
    };
}

module.exports = (React) => connect((state) => {
    const resourceType = state.get('resourceType');

    return {
        resources: state.get(resourceType).toJS(),
        resourceType
    };
})(maybeResourceList(React));
