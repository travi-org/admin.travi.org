var React = require('react');

module.exports = React.createClass({
    contextTypes: {
        data: React.PropTypes.object.isRequired
    },

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

        if (this.context.data.resources.length) {
            resources = <ul className="list-group">{ this.context.data.resources.map(renderResourceAsListItem) }</ul>;
        } else {
            resources = <p className="alert alert-info">No { this.context.data.resourceType } are available</p>;
        }

        return resources;
    }
});
