import {getResource, getResources, getNav} from '../../../../lib/server/resources/fetcher';
import * as controller from '../../../../lib/server/resources/controller';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

suite('server-side data fetcher', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(controller, 'getResource');
        sandbox.stub(controller, 'getListOf');
        sandbox.stub(controller, 'listResourceTypes');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that it gets a single resource', () => {
        const
            type = any.string(),
            id = any.integer(),
            promise = any.simpleObject();
        controller.getResource.withArgs(type, id).returns(promise);

        assert.equal(getResource(type, id), promise);
    });

    test('that it gets a list of resources', () => {
        const
            type = any.string(),
            promise = any.simpleObject();
        controller.getListOf.withArgs(type).returns(promise);

        assert.equal(getResources(type), promise);
    });

    test('that it gets the primary-nav', () => {
        const promise = any.simpleObject();
        controller.listResourceTypes.returns(promise);

        assert.equal(getNav(), promise);
    });
});
