'use strict';

const React = require('react');

module.exports = React.createClass({
    contextTypes: {
        data: React.PropTypes.object.isRequired
    },

    render() {
        return <h3>{this.context.data.resource.displayName}</h3>;
    }
});
