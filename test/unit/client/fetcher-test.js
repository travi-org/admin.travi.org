import {getResource} from '../../../lib/client/fetcher';
import sinon from 'sinon';
import xhr from 'xhr';
import {assert} from 'chai';
import any from '@travi/any';

suite('client-side data fetcher', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(xhr, 'get');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that a GET request is made for an individual resource', () => {
        const
            type = any.string(),
            id = any.integer(),
            promise = any.simpleObject();

        xhr.get.withArgs(`/${type}/${id}`).returns(promise);

        assert.equal(getResource({type, id}), promise);
    });
});
