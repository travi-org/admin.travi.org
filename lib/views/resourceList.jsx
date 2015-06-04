var React = require('react/addons'),

    Layout = require('./layout/layout.jsx');

module.exports = React.createClass({
    render: function () {
        'use strict';

        var resources;
        if (this.props.resources.length) {
            resources = <ul>
                {this.props.resources.map(function (resource) {
                    return <li>{resource}</li>;
                })}
            </ul>;
        } else {
            resources = <p className="alert alert-info">No { this.props.resourceType } are available</p>;
        }

        return (
            <Layout types={this.props.types}>
            {resources}
            </Layout>
        );
    }
});
