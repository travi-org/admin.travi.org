var React = require('react'),

    Wrap = require('./theme/wrap.jsx');

module.exports = React.createClass({
    render: function () {
        'use strict';

        return (
            <Wrap types={this.props.types}>
                <h3>{this.props.resource.displayName}</h3>
            </Wrap>
        );
    }
});
