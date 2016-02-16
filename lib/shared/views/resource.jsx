'use strict';

const
    React = require('react'),
    connect = require('react-redux').connect,

    Resource = React.createClass({
        render() {
            return <h3>{this.props.resource.displayName}</h3>;
        }
    });

module.exports = connect((state) => {
    return {
        resource: state.get('resource').toJS()
    };
})(Resource);
