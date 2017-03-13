import {getLinksFor, getResourceBy, getListOf as getList} from './travi-api-resources';
import {getMapperFor} from './mappers/resource-mapper-factory';

function removeSelfLinkFrom(resourceTypes) {
  const selfIndex = resourceTypes.indexOf('self');

  if (resourceTypes.includes('self')) {
    const LINK_COUNT_TO_REMOVE = 1;
    resourceTypes.splice(selfIndex, LINK_COUNT_TO_REMOVE);
  }
}

export function listResourceTypes() {
  return new Promise((resolve, reject) => {
    getLinksFor('catalog', (err, links) => {
      if (err) {
        reject(err);
      } else {
        const rels = Object.keys(links);

        removeSelfLinkFrom(rels);

        resolve(rels.map(rel => {
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
  });
}

export function getResource(resourceType, resourceId) {
  return new Promise((resolve, reject) => {
    getResourceBy(resourceType, resourceId)
      .then(r => resolve(getMapperFor(resourceType).mapToView(r)))
      .catch(e => reject(e));
  });
}

export function getListOf(resourceType) {
  return new Promise((resolve, reject) => {
    getList(resourceType, (err, list) => {
      if (err) reject(err);
      else resolve(getMapperFor(resourceType).mapToViewList(list));
    });
  });
}
