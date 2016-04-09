import {mapToView, mapToViewList} from '../../../../../lib/server/resources/mappers/default-mapper';
import {assert} from 'chai';

suite('default mapper', () => {
    test('that the original list is returned untouched', () => {
        const
            list = [{foo: 'bar'}],

            viewList = mapToViewList(list),

            view = viewList[0];

        assert.equal(view.foo, 'bar');
        assert.deepEqual(view.links, {});
    });

    test('that the original resource is returned untouched', () => {
        const
            resource = {foo: 'bar'},

            view = mapToView(resource);

        assert.equal(view.foo, 'bar');
        assert.deepEqual(view.links, {});
    });
});
