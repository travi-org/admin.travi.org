'use strict';


module.exports = (React) => {
    function Resource(props) {
        return <h3>{props.resource.displayName}</h3>;
    }
    Resource.displayName = 'Resource';

    return Resource;
};
