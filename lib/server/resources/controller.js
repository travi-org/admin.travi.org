import {getLinksFor, getResourceBy, getListOf as getList} from './travi-api-resources';
import {getMapperFor} from './mappers/resource-mapper-factory';
import _ from 'lodash';

function removeSelfLinkFrom(resourceTypes) {
    const selfIndex = resourceTypes.indexOf('self');

    if (_.includes(resourceTypes, 'self')) {
        resourceTypes.splice(selfIndex, 1);
    }
}

function listResourceTypes(callback) {
    getLinksFor('catalog', (err, links) => {
        if (err) {
            callback(err);
        } else {
            const rels = Object.keys(links);

            removeSelfLinkFrom(rels);

            callback(null, _.map(rels, (rel) => {
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
