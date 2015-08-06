var React = require('react'),

    Layout = require('./layout/layout.jsx');

module.exports = React.createClass({
    render: function () {
        'use strict';

        return (
            <Layout types={this.props.types}>
                <h3>{this.props.resource.displayName}</h3>
            </Layout>
        );
    }
});
