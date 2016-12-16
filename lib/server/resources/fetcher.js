import * as controller from './controller';

export function createFetcher() {
    return {
        getResource(type, id) {
            return controller.getResource(type, id);
        },
        getResources(type) {
            return controller.getListOf(type);
        },
        getNav() {
            return controller.listResourceTypes();
        }
    };
}
