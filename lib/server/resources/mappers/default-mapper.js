function mapToView(resource) {
    resource.links = {};

    return resource;
}

function mapToViewList(list) {
    return list.map(mapToView);
}

module.exports = {
    mapToView,
    mapToViewList
};
