'use strict';

const
    React = require('react'),
    Link = require('react-router').Link,
    repository = require('../../client/repository');

module.exports = React.createClass({
    statics: {
        loadProps(params, callback) {
            repository.getResources(params.type, callback);
        }
    },

    render() {
        let resources;

        function renderResourceAsListItem(resource) {
            let thumbnail = '',
                link;

            if (resource.thumbnail) {
                thumbnail = <img src={resource.thumbnail.src} className="thumbnail" />;
            }

            if (resource.links.self) {
                link = <Link to={resource.links.self.href}>{resource.displayName}</Link>;
            } else {
                link = resource.displayName;
            }

            return <li key={resource.id} className="list-group-item">{thumbnail}{link}</li>;
        }

        if (this.props.resources.length) {
            resources = <ul className="list-group">{ this.props.resources.map(renderResourceAsListItem) }</ul>;
        } else {
            resources = <p className="alert alert-info">No { this.props.resourceType } are available</p>;
        }

        return resources;
    }
});
