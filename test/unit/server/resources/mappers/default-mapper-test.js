import {assert} from 'chai';
import {mapToView, mapToViewList} from '../../../../../src/server/resources/mappers/default-mapper';

suite('default mapper', () => {
  test('that the original list is returned untouched', () => {
    const list = [{foo: 'bar'}];

    const viewList = mapToViewList(list);

    const view = viewList[0];

    assert.equal(view.foo, 'bar');
    assert.deepEqual(view.links, {});
  });

  test('that the original resource is returned untouched', () => {
    const resource = {foo: 'bar'};

    const view = mapToView(resource);

    assert.equal(view.foo, 'bar');
    assert.deepEqual(view.links, {});
  });
});
