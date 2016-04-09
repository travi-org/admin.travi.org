import {getResource, getResources} from './repository';

export default function (store) {

    function hydrate(nextState, replace, callback) {
        const [, resourceType, resourceId] = nextState.location.pathname.split('/');

        if (resourceId) {
            getResource(resourceType, resourceId, (err, data) => {
                store.dispatch({
                    type: 'SET_RESOURCE',
                    resource: data.resource
                });

                callback();
            });
        } else {
            getResources(resourceType, (err, data) => {
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
}
