'use strict';

const
    Link = require('react-router').Link,
    ListGroupItem = require('react-bootstrap').ListGroupItem;

module.exports = (React) => {
    function ListItem({resource}) {
        return (
            <ListGroupItem key={resource.id}>{(() => {
                if (resource.links.self) {
                    return <Link to={resource.links.self.href}>{resource.displayName}</Link>;
                } else {
                    return resource.displayName;
                }
            })()}</ListGroupItem>
        );
    }

    ListItem.displayName = 'ListItem';

    return ListItem;
};
