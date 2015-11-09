'use strict';

const
    stampit = require('stampit'),
    baseView = require('./base-mapper');

module.exports = stampit
    .props({resourceType: 'rides'})
    .methods({
        mapToView: function mapToView(ride) {
            return {
                id: ride.id,
                displayName: ride.nickname,
                links: this.mapLinks(ride)
            };
        }
    })
    .compose(baseView)();
