'use strict';

var mapper = require('../../../lib/mappers/defaultMapper');

suite('default mapper', function () {
    test('that the expected methods are exposed', function () {
        assert.isFunction(mapper.mapToViewList);
    });

    test('that the original list is returned untouched', function () {
        var list = [{foo: 'bar'}],

            viewList = mapper.mapToViewList(list);

        assert.same(viewList, list);
        assert.equals(viewList, list);
    });

    test('that the original resource is returned untouched', function () {
        var resource = {foo: 'bar'},

            view = mapper.mapToView(resource);

        assert.same(view, resource);
        assert.equals(view, resource);
    });
});
