import handler from '../../../../lib/server/view/route-handler';
import * as controller from '../../../../lib/server/resources/controller';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';

suite('landing route handler', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(controller, 'listResourceTypes');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that resource-types are returned as primary-nav', () => {
        const
            types = any.listOf(any.simpleObject),
            reply = sinon.spy();
        controller.listResourceTypes.resolves(types);

        return handler(null, reply).then(() => {
            assert.calledWith(reply, {primaryNav: types});
        });
    });
});
