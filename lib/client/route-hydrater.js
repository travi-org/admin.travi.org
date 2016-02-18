'use strict';

const repository = require('./repository');

function hydrate(nextState, replace, callback) {
    const [, resourceType, resourceId] = nextState.location.pathname.split('/');

    if (resourceId) {
        repository.getResource(resourceType, resourceId, () => {

            callback();
        });
    } else {
        repository.getResources(resourceType, () => {

            callback();
        });
    }
}

module.exports = {
    hydrate
};
