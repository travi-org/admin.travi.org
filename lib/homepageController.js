var traviApiResources = require('./traviApiResources');

function removeSelfLinkFrom(resourceTypes) {
    var selfIndex = resourceTypes.indexOf('self');

    if (selfIndex > -1) {
        resourceTypes.splice(selfIndex, 1);
    }
}

function resourceTypes(request, reply) {
    traviApiResources.getLinksFor('catalog', function (err, links) {
        var rels = Object.keys(links);

        removeSelfLinkFrom(rels);

        reply(rels);
    });
}

module.exports = {
    resourceTypes: resourceTypes
};