var React = require('react/addons'),

    Layout = require('./layout/layout.jsx');

module.exports = React.createClass({
    render: function () {
        'use strict';

        var resources;

        if (this.props.resources.length) {
            resources = <ul className="list-group">
                {this.props.resources.map(function (resource) {
                    var thumbnail;

                    if (resource.thumbnail) {
                        thumbnail = <img src={resource.thumbnail} className="thumbnail" />;
                    } else {
                        thumbnail = '';
                    }

                    return <li key={resource.id} className="list-group-item">
                        {thumbnail}
                        {resource.displayName}
                    </li>;
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
