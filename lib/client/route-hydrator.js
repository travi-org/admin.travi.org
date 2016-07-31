import {getResources} from './repository';

export default function (store) {

    function hydrate(nextState, replace, callback) {
        const [, resourceType, resourceId] = nextState.location.pathname.split('/');

        if (resourceId) {
            callback();
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
