var React = require('react'),

    Wrap = require('./theme/wrap.jsx');

module.exports = React.createClass({
    render: function () {
        'use strict';

        var resources;

        function renderResourceAsListItem(resource) {
            var thumbnail = '',
                link;

            if (resource.thumbnail) {
                thumbnail = <img src={resource.thumbnail.src} className="thumbnail" />;
            }

            if (resource.links.self) {
                link = <a href={resource.links.self.href}>{resource.displayName}</a>;
            } else {
                link = resource.displayName;
            }

            return <li key={resource.id} className="list-group-item">{thumbnail}{link}</li>;
        }

        if (this.props.resources.length) {
            resources = <ul className="list-group">{this.props.resources.map(renderResourceAsListItem)}</ul>;
        } else {
            resources = <p className="alert alert-info">No { this.props.resourceType } are available</p>;
        }

        return (
            <Wrap types={this.props.types}>
                {resources}
            </Wrap>
        );
    }
});
