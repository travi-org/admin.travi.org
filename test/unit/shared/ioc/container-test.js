import {add, use} from '../../../../lib/shared/ioc/container';
import {assert} from 'chai';
import any from '@travi/any';

suite('ioc container', () => {
    it('should store dependency instances', () => {
        const
            dependency = any.simpleObject(),
            name = any.string();

        add(name, dependency);

        assert.equal(use(name), dependency);
    });
});
