import stampit from 'stampit';
import baseView from './base-mapper';

export default stampit
  .props({resourceType: 'persons'})
  .methods({
    mapToView: function mapToView(person) {
      return {
        id: person.id,
        displayName: `${person['first-name']} ${person['last-name']}`,
        links: this.mapLinks(person),
        name: {
          first: person['first-name'],
          last: person['last-name']
        },
        thumbnail: person.avatar
      };
    }
  })
  .compose(baseView)();
