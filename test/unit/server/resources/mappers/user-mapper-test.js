import {assert} from 'chai';
import any from '@travi/any';
import mapper from '../../../../../src/server/resources/mappers/person-mapper';
import {resources} from '../../../../helpers/any-for-admin';

suite('person mapper', () => {
  test('that person resources mapped to view list', () => {
    const person = resources.person();

    assert.deepEqual(
      [{
        id: person.id,
        displayName: `${person['first-name']} ${person['last-name']}`,
        name: {
          first: person['first-name'],
          last: person['last-name']
        },
        thumbnail: person.avatar,
        links: {}
      }],
      mapper.mapToViewList([person])
    );
  });

  test('that person mapped to view', () => {
    const person = resources.person();

    assert.deepEqual(
      {
        id: person.id,
        displayName: `${person['first-name']} ${person['last-name']}`,
        name: {
          first: person['first-name'],
          last: person['last-name']
        },
        thumbnail: person.avatar,
        links: {}
      },
      mapper.mapToView(person)
    );
  });

  test('that self link defined when defined in api', () => {
    const person = resources.person();
    person._links.self = any.url();

    assert.deepEqual(
      {
        self: {
          href: `/persons/${person.id}`
        }
      },
      mapper.mapToView(person).links
    );
  });
});
