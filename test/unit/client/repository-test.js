import {simpleObject} from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

suite('client repository', () => {
    const
        xhr = sinon.stub(),
        repository = proxyquire('../../../lib/client/repository', {xhr});

    test('that the list of resource types is requested from server', () => {
        const
            data = [simpleObject()],
            callback = sinon.spy();

        repository.getResourceTypes(callback);

        assert.calledWith(xhr, {url: '/'});

        xhr.yield(null, {
            body: JSON.stringify(data)
        });

        assert.calledWith(callback, null, data);
    });

    test('that error bubbles when getting a resource list', () => {
        const
            error = simpleObject(),
            callback = sinon.spy();
        xhr.withArgs({url: '/'}).yields(error);

        repository.getResourceTypes(callback);

        assert.calledWith(callback, error);
    });
});
