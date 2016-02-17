'use strict';

const
    React = require('react'),
    connect = require('react-redux').connect,
    Link = require('react-router').Link,
    ListGroup = require('react-bootstrap').ListGroup,
    ListGroupItem = require('react-bootstrap').ListGroupItem,

    ResourceList = React.createClass({
        render() {
            let resources;

            function renderResourceAsListItem(resource) {
                let thumbnail = '',
                    link;

                if (resource.thumbnail) {
                    thumbnail = <img src={resource.thumbnail.src} className="thumbnail"/>;
                }

                if (resource.links.self) {
                    link = <Link to={resource.links.self.href}>{resource.displayName}</Link>;
                } else {
                    link = resource.displayName;
                }

                return <ListGroupItem key={resource.id}>{thumbnail}{link}</ListGroupItem>;
            }

            if (this.props.resources.length) {
                resources = <ListGroup>{ this.props.resources.map(renderResourceAsListItem) }</ListGroup>;
            } else {
                resources = <p className="alert alert-info">No { this.props.resourceType } are available</p>;
            }

            return resources;
        }
    });

module.exports = connect((state) => {
    const resourceType = state.get('resourceType');

    return {
        resources: state.get(resourceType).toJS(),
        resourceType
    };
})(ResourceList);
