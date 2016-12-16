import {define} from '../../../../lib/server/dependencies';
import * as fetcher from '../../../../lib/server/resources/fetcher';
import * as container from '@travi/ioc';
import {assert} from 'chai';
import sinon from 'sinon';

suite('server dependencies', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(container, 'register');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the dependencies are loaded into the container', () => {
        define();

        assert.calledWith(container.register, 'fetcher-factory', fetcher);
    });
});
