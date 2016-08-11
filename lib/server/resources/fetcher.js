import * as controller from './controller';

export function getResource(type, id) {
    return controller.getResource(type, id);
}

export function getResources(type) {
    return controller.getListOf(type);
}

export function getNav() {
    return controller.listResourceTypes();
}
