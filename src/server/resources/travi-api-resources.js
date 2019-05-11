import traverson from 'traverson';
import JsonHalAdapter from 'traverson-hal';
import Boom from 'boom';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

let apiRoot = 'https://api.travi.org/';
const ENVIRONMENT_ARG = 2;

function api() {
  return traverson.from('local' === process.argv[ENVIRONMENT_ARG] ? 'http://localhost:4444' : apiRoot)
    .withRequestOptions({headers: {Accept: 'application/hal+json'}});
}

function getResourceList(document, resourceType) {
  let list = [];
  const embedded = document._embedded[resourceType];

  if (Array.isArray(embedded)) {
    list = embedded;
  } else {
    list.push(embedded);
  }

  return list;
}

export function getLinksFor(resource, callback) {
  api()
    .getResource((err, document) => {
      if (err) {
        callback(err);
      } else {
        callback(null, document._links);
      }
    });
}

export function getListOf(resourceType, callback) {
  api()
    .follow(resourceType)
    .getResource((err, document) => {
      if (err) {
        if (err.message.startsWith('Could not find a matching link nor an embedded document for')) {
          callback(Boom.notFound(err));
        } else {
          callback(err);
        }
      } else {
        callback(null, getResourceList(document, resourceType));
      }
    });
}

export function getResourceBy(resourceType, resourceId) {
  return new Promise((resolve, reject) => {
    api()
      .follow(resourceType, `${resourceType}[id:${resourceId}]`, 'self')
      .getResource((err, resource) => {
        if (err) {
          if (err.message.startsWith('Could not find a matching link nor an embedded document for')) {
            reject(Boom.notFound(err));
          } else {
            reject(err);
          }
        } else {
          resolve(resource);
        }
      });
  });
}

export function setHost(host) {
  apiRoot = host;
}
