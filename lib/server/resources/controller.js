import {getLinksFor, getResourceBy, getListOf as getList} from './travi-api-resources';
import {getMapperFor} from './mappers/resource-mapper-factory';

function removeSelfLinkFrom(resourceTypes) {
    const selfIndex = resourceTypes.indexOf('self');

    if (resourceTypes.includes('self')) {
        const LINK_COUNT_TO_REMOVE = 1;
        resourceTypes.splice(selfIndex, LINK_COUNT_TO_REMOVE);
    }
}

function listResourceTypes(callback) {
    getLinksFor('catalog', (err, links) => {
        if (err) {
            callback(err);
        } else {
            const rels = Object.keys(links);

            removeSelfLinkFrom(rels);

            callback(null, rels.map((rel) => {
                if ('persons' === rel) {
                    return {
                        text: 'people',
                        path: `/${rel}`
                    };
                }

                return {
                    text: rel,
                    path: `/${rel}`
                };
            }));
        }
    });
}

function getResource(resourceType, resourceId, callback) {
    getResourceBy(resourceType, resourceId, (err, resource) => {
        if (err) {
            callback(err);
        } else {
            callback(null, getMapperFor(resourceType).mapToView(resource));
        }
    });
}

function getListOf(resourceType, callback) {
    getList(resourceType, (err, list) => {
        if (err) {
            callback(err);
        } else {
            callback(null, getMapperFor(resourceType).mapToViewList(list));
        }
    });
}

export {
    listResourceTypes,
    getResource,
    getListOf
};
