'use strict';

const
    connect = require('react-redux').connect,
    Link = require('react-router').Link,
    ListGroup = require('react-bootstrap').ListGroup,
    ListGroupItem = require('react-bootstrap').ListGroupItem;

function resourceList(React) {
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

    return (props) => {
        if (props.resources.length) {
            return <ListGroup>{ props.resources.map(renderResourceAsListItem) }</ListGroup>;
        } else {
            return <p className="alert alert-info">No { props.resourceType } are available</p>;
        }
    };
}

module.exports = (React) => connect((state) => {
    const resourceType = state.get('resourceType');

    return {
        resources: state.get(resourceType).toJS(),
        resourceType
    };
})(resourceList(React));
