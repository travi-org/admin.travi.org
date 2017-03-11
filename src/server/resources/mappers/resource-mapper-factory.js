export function getMapperFor(resourceType) {
    switch (resourceType) {
    case 'persons':
        return require('./person-mapper');
    case 'rides':
        return require('./ride-mapper');
    default:
        return require('./default-mapper');
    }
}
