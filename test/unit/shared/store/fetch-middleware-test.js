import middleware from '../../../../lib/shared/store/fetch-middleware';
import * as iocContainer from '../../../../lib/shared/ioc/container';
import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';

suite('fetch middleware', () => {
    let sandbox;
    const
        action = any.simpleObject(),
        initiate = any.string();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(iocContainer, 'use');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the action is passed to the next middleware if `fetch` is not defined in the action', () => {
        const
            nextResult = any.simpleObject(),
            next = sinon.stub();
        next.withArgs(action).returns(nextResult);

        assert.equal(middleware({})(next)(action), nextResult);
    });

    test('that dispatch is called with the `initiate` topic', () => {
        const
            data = any.simpleObject(),
            dispatch = sinon.stub();

        middleware({dispatch})()({...action, data, fetch: () => ({then: () => undefined}), initiate});

        assert.calledWith(dispatch, {type: initiate, ...data});
    });

    test('that the `success` topic is dispatched upon a successful fetch', () => {
        const
            fetcher = any.simpleObject(),
            dispatch = sinon.stub(),
            fetch = sinon.stub(),
            success = any.string(),
            response = any.simpleObject();
        iocContainer.use.withArgs('fetcher').returns(fetcher);
        fetch.withArgs(fetcher).resolves(response);

        return middleware({dispatch})()({...action, fetch, initiate, success}).then(() => {
            assert.calledWith(dispatch, {type: success, resource: response});
        });
    });

    test('that the `failure` topic is dispatched upon a failed fetch', () => {
        const
            fetcher = any.simpleObject(),
            dispatch = sinon.stub(),
            fetch = sinon.stub(),
            failure = any.string(),
            error = any.simpleObject();
        iocContainer.use.withArgs('fetcher').returns(fetcher);
        fetch.withArgs(fetcher).rejects(error);

        return middleware({dispatch})()({...action, fetch, initiate, failure}).then(() => {
            assert.calledWith(dispatch, {type: failure, error});
        });
    });
});
