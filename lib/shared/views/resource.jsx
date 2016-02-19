'use strict';

const connect = require('react-redux').connect;

function resource(React) {
    return (props) => <h3>{props.resource.displayName}</h3>;
}

module.exports = (React) => connect((state) => {
    return {
        resource: state.get('resource').toJS()
    };
})(resource(React));
