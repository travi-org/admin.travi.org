import {getResource} from '../../../../lib/server/resources/fetcher';
import resources from '../../../../lib/server/resources/travi-api-resources';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

suite('server-side data fetcher', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(resources, 'getResourceBy');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that it gets data from the repository', () => {
        const
            type = any.string(),
            id = any.integer(),
            promise = any.simpleObject();
        resources.getResourceBy.withArgs(type, id).returns(promise);

        assert.equal(getResource(type, id), promise);

    });
});
