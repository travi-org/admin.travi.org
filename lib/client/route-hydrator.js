'use strict';

const repository = require('./repository');

module.exports = function (store) {

    function hydrate(nextState, replace, callback) {
        const [, resourceType, resourceId] = nextState.location.pathname.split('/');

        if (resourceId) {
            repository.getResource(resourceType, resourceId, () => {
                store.dispatch({
                    type: 'SET_RESOURCE'
                });

                callback();
            });
        } else {
            repository.getResources(resourceType, (err, data) => {
                store.dispatch({
                    type: 'SET_RESOURCES',
                    resourceType: data.resourceType,
                    resources: data[data.resourceType]
                });

                callback();
            });
        }
    }

    return {
        hydrate
    };
};
