export function getMapperFor(resourceType) {
  switch (resourceType) {
    case 'persons':
      return require('./person-mapper').default;
    case 'rides':
      return require('./ride-mapper').default;
    default:
      return require('./default-mapper');
  }
}
