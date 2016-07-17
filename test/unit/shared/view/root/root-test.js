import devRoot from '../../../../../lib/shared/views/root/root.dev.js';
import prodRoot from '../../../../../lib/shared/views/root/root.prod.js';
import {assert} from 'chai';

suite('environment dependent root component', () => {
    setup(() => {
        delete require.cache[require.resolve('../../../../../lib/shared/views/root/root')];
    });

    teardown(() => {
        process.env.NODE_ENV = null;
        delete require.cache[require.resolve('../../../../../lib/shared/views/root/root')];
    });

    test('that the dev component loads in dev environment', () => {
        process.env.NODE_ENV = 'development';

        assert.equal(require('../../../../../lib/shared/views/root/root').default, devRoot);
    });

    test('that the production component loads in non-dev environment', () => {
        assert.equal(require('../../../../../lib/shared/views/root/root').default, prodRoot);
    });
});
