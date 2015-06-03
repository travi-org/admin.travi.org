var React = require('react/addons'),

    Layout = require('./layout/layout.jsx');

module.exports = React.createClass({
    render: function () {
        'use strict';

        return (
            <Layout types={this.props.types}>
                <p className="alert alert-info">No { this.props.resourceType } are available</p>
            </Layout>
        );
    }
});
