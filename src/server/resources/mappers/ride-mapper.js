import stampit from 'stampit';
import baseView from './base-mapper';

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
