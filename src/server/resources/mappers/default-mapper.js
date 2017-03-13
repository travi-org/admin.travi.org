export function mapToView(resource) {
  return {...resource, links: {}};
}

export function mapToViewList(list) {
  return list.map(mapToView);
}
