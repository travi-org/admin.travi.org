import {simpleObject, string, integer} from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

suite('client repository', () => {
    const
        xhr = sinon.stub(),
        repository = proxyquire('../../../lib/client/repository', {xhr});

    test('that resource is requested from server by id', () => {
        const
            data = [simpleObject()],
            type = string(),
            id = integer(),
            callback = sinon.spy();

        repository.getResource(type, id, callback);

        assert.calledWith(xhr, {url: `/${type}/${id}`});

        xhr.yield(null, {
            body: JSON.stringify(data)
        });

        assert.calledWith(callback, null, data);
    });

    test('that error bubbles when getting a resource by id', () => {
        const
            error = simpleObject(),
            callback = sinon.spy(),
            type = string(),
            id = integer();
        xhr.withArgs({url: `/${type}/${id}`}).yields(error);

        repository.getResource(type, id, callback);

        assert.calledWith(callback, error);
    });

    test('that a list of resources is requested from server', () => {
        const
            data = [simpleObject()],
            type = string(),
            callback = sinon.spy();

        repository.getResources(type, callback);

        assert.calledWith(xhr, {url: `/${type}`});

        xhr.yield(null, {
            body: JSON.stringify(data)
        });

        assert.calledWith(callback, null, data);
    });

    test('that error bubbles when getting a resource list', () => {
        const
            error = simpleObject(),
            callback = sinon.spy(),
            type = string();
        xhr.withArgs({url: `/${type}`}).yields(error);

        repository.getResources(type, callback);

        assert.calledWith(callback, error);
    });

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
