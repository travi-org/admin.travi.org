import mapper from '../../../../../lib/server/resources/mappers/default-mapper';
import {assert} from 'chai';

suite('default mapper', () => {
    test('that the expected methods are exposed', () => {
        assert.isFunction(mapper.mapToViewList);
    });

    test('that the original list is returned untouched', () => {
        const
            list = [{foo: 'bar'}],

            viewList = mapper.mapToViewList(list),

            view = viewList[0];

        assert.equal(view.foo, 'bar');
        assert.deepEqual(view.links, {});
    });

    test('that the original resource is returned untouched', () => {
        const
            resource = {foo: 'bar'},

            view = mapper.mapToView(resource);

        assert.equal(view.foo, 'bar');
        assert.deepEqual(view.links, {});
    });
});
