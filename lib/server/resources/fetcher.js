import resources from './travi-api-resources';

export function getResource(type, id) {
    resources.getResourceBy(type, id);
}
