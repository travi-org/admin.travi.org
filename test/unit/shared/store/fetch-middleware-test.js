import middleware from '../../../../lib/shared/store/fetch-middleware';
import * as iocContainer from '../../../../lib/shared/ioc/container';
import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';

suite('fetch middleware', () => {
    let sandbox, fetch;
    const
        action = any.simpleObject(),
        initiate = any.string(),
        fetcher = any.simpleObject(),
        error = any.word();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(iocContainer, 'use');

        fetch = sinon.stub();
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
        fetch.resolves();

        return middleware({dispatch})()({...action, data, fetch, initiate}).then(() => {
            assert.calledWith(dispatch, {type: initiate, ...data});
        });
    });

    test('that error is not thrown if supplemental data is not provided', () => {
        const dispatch = sinon.stub();
        fetch.rejects();

        return middleware({dispatch})()({...action, fetch, initiate}).catch(() => {
            assert.calledWith(dispatch, {type: initiate});
        });
    });

    test('that the `success` topic is dispatched upon a successful fetch', () => {
        const
            dispatch = sinon.stub(),
            success = any.string(),
            response = any.simpleObject();
        iocContainer.use.withArgs('fetcher').returns(fetcher);
        fetch.withArgs(fetcher).resolves(response);

        return middleware({dispatch})()({...action, fetch, initiate, success}).then(() => {
            assert.calledWith(dispatch, {type: success, resource: response});
        });
    });

    test('that the `failure` topic is dispatched upon a failed fetch', () => {
        iocContainer.use.withArgs('fetcher').returns(fetcher);
        fetch.withArgs(fetcher).rejects(error);
        const
            dispatch = sinon.stub(),
            failure = any.string(),

            promise = middleware({dispatch})()({...action, fetch, initiate, failure});

        return Promise.all([
            assert.isRejected(promise, new RegExp(error)),
            promise.catch(() => {
                assert.calledWith(dispatch, {type: failure, error: new Error(error)});
            })
        ]);
    });
});
