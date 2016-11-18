import {configure} from '../../../lib/client/dependencies';
import * as fetcher from '../../../lib/client/fetcher';
import * as container from '@travi/ioc';
import {assert} from 'chai';
import sinon from 'sinon';

suite('client dependencies', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(container, 'add');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the dependencies are loaded into the container', () => {
        configure();

        assert.calledWith(container.add, 'fetcher', fetcher);
    });
});
