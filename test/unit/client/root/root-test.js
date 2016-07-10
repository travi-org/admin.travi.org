import devRoot from '../../../../lib/client/root/root.dev.js';
import prodRoot from '../../../../lib/client/root/root.prod.js';
import {assert} from 'chai';

suite('environment dependent root component', () => {
    teardown(() => {
        process.env.NODE_ENV = null;
        delete require.cache[require.resolve('../../../../lib/client/root/root')];
    });

    test('that the dev component loads in dev environment', () => {
        process.env.NODE_ENV = 'development';

        assert.equal(require('../../../../lib/client/root/root'), devRoot);
    });

    test('that the production component loads in non-dev environment', () => {
        assert.equal(require('../../../../lib/client/root/root').default, prodRoot);
    });
});
