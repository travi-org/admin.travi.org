'use strict';

const ListGroupItem = require('react-bootstrap').ListGroupItem;

module.exports = (React) => {
    function ListItem(props) {
        return <ListGroupItem key={props.resource.id}>{props.resource.displayName}</ListGroupItem>;
    }

    return ListItem;
};
