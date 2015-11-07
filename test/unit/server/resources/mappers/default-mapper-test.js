const mapper = require('../../../../../lib/server/resources/mappers/default-mapper');

suite('default mapper', function () {
    test('that the expected methods are exposed', function () {
        assert.isFunction(mapper.mapToViewList);
    });

    test('that the original list is returned untouched', function () {
        const
            list = [{foo: 'bar'}],

            viewList = mapper.mapToViewList(list),

            view = viewList[0];

        assert.equals(view.foo, 'bar');
        assert.equals(view.links, {});
    });

    test('that the original resource is returned untouched', function () {
        const
            resource = {foo: 'bar'},

            view = mapper.mapToView(resource);

        assert.equals(view.foo, 'bar');
        assert.equals(view.links, {});
    });
});
