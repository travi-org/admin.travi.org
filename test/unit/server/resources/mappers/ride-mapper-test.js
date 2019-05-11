import assert from 'assert';
import any from '@travi/any';
import mapper from '../../../../../src/server/resources/mappers/ride-mapper';
import {resources} from '../../../../helpers/any-for-admin';

suite('ride mapper', () => {
  test('that ride resources mapped to view list', () => {
    const ride = resources.ride();

    assert.deepEqual(
      [{
        id: ride.id,
        displayName: ride.nickname,
        links: {}
      }],
      mapper.mapToViewList([ride])
    );
  });

  test('that ride mapped to view', () => {
    const ride = resources.ride();

    assert.deepEqual(
      {
        id: ride.id,
        displayName: ride.nickname,
        links: {}
      },
      mapper.mapToView(ride)
    );
  });

  test('that self link defined when defined in api', () => {
    const ride = resources.ride();
    ride._links.self = any.url();

    assert.deepEqual(
      {
        self: {
          href: `/rides/${ride.id}`
        }
      },
      mapper.mapToView(ride).links
    );
  });
});
