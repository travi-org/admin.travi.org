import resources from './travi-api-resources';

export function getResource(type, id) {
    return resources.getResourceBy(type, id);
}
