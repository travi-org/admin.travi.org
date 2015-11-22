'use strict';

const
    React = require('react'),
    repository = require('../../client/repository');

module.exports = React.createClass({
    statics: {
        loadProps(params, callback) {
            repository.getResource(params.type, params.id, callback);
        }
    },

    render() {
        return <h3>{this.props.resource.displayName}</h3>;
    }
});
