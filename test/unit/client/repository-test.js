'use strict';

const
    any = require('../../helpers/any'),
    assert = require('chai').assert,
    sinon = require('sinon'),
    proxyquire = require('proxyquire');

suite('client repository', () => {
    const
        xhr = sinon.stub(),
        repository = proxyquire('../../../lib/client/repository', {xhr});

    test('that resource is requested from server by id', () => {
        const
            data = [any.simpleObject()],
            type = any.string(),
            id = any.int(),
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
            error = any.simpleObject(),
            callback = sinon.spy(),
            type = any.string(),
            id = any.int();
        xhr.withArgs({url: `/${type}/${id}`}).yields(error);

        repository.getResource(type, id, callback);

        assert.calledWith(callback, error);
    });

    test('that a list of resources is requested from server', () => {
        const
            data = [any.simpleObject()],
            type = any.string(),
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
            error = any.simpleObject(),
            callback = sinon.spy(),
            type = any.string();
        xhr.withArgs({url: `/${type}`}).yields(error);

        repository.getResources(type, callback);

        assert.calledWith(callback, error);
    });

    test('that the list of resource types is requested from server', () => {
        const
            data = [any.simpleObject()],
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
            error = any.simpleObject(),
            callback = sinon.spy();
        xhr.withArgs({url: '/'}).yields(error);

        repository.getResourceTypes(callback);

        assert.calledWith(callback, error);
    });
});
