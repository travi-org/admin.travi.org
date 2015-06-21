'use strict';

var mapper = require('../../../lib/mappers/defaultMapper');

suite('default mapper', function () {
    test('that the expected methods are exposed', function () {
        assert.isFunction(mapper.mapToViewList);
    });
});
