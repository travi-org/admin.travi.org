'use strict';

var _ = require('lodash'),
    stampit = require('stampit');

module.exports = stampit({
    methods: {
        mapLinks: function mapLinks(resource) {
            var links = {};

            if (resource._links.self) {
                links.self = {
                    href: '/' + this.resourceType + '/' + resource.id
                };
            }

            return links;
        },
        mapToViewList: function mapToViewList(list) {
            return _.map(list, this.mapToView, this);
        }
    }
});
