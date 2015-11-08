var React = require('react');

module.exports = React.createClass({
    contextTypes: {
        data: React.PropTypes.object.isRequired
    },

    render: function () {
        'use strict';

        return (
            <h3>{this.context.data.resource.displayName}</h3>
        );
    }
});
