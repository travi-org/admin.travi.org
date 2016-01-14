'use strict';

const
    _ = require('lodash'),
    stampit = require('stampit');

module.exports = stampit({
    methods: {
        mapLinks: function mapLinks(resource) {
            const links = {};

            if (resource._links.self) {
                links.self = {
                    href: `/${this.resourceType}/${resource.id}`
                };
            }

            return links;
        },
        mapToViewList: function mapToViewList(list) {
            return _.map(list, _.bind(this.mapToView, this));
        }
    }
});
