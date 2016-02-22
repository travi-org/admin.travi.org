'use strict';

const
    Link = require('react-router').Link,
    ListGroup = require('react-bootstrap').ListGroup,
    ListGroupItem = require('react-bootstrap').ListGroupItem;

module.exports = (React) => {
    function ResourceList({resources}) {
        return (
            <ListGroup>{ resources.map((resource) => (
                <ListGroupItem key={resource.id}>{(() => {
                    if (resource.thumbnail) {
                        return <img src={resource.thumbnail.src} className="thumbnail"/>;
                    } else {
                        return '';
                    }
                })()}{(() => {
                    if (resource.links.self) {
                        return <Link to={resource.links.self.href}>{resource.displayName}</Link>;
                    } else {
                        return resource.displayName;
                    }
                })()}</ListGroupItem>
            )) }</ListGroup>
        );
    }
    ResourceList.displayName = 'ResourceList';

    return ResourceList;
};
