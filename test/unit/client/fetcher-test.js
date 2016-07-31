import {getResource, getResources} from '../../../lib/client/fetcher';
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

    suite('individual resource', () => {
        test('that a GET request is made for an individual resource', () => {
            const
                type = any.string(),
                id = any.integer(),
                response = any.simpleObject();

            xhr.get.withArgs(`/${type}/${id}`).yields(null, response);

            return assert.becomes(getResource(type, id), response);
        });

        test('that a fetch error results in a rejected promise', () => {
            const
                type = any.string(),
                id = any.integer(),
                error = any.word();

            xhr.get.yields(error);

            return assert.isRejected(getResource(type, id), new RegExp(error));
        });
    });

    suite('resource list', () => {
        test('that a GET request is made for an individual resource', () => {
            const
                type = any.string(),
                response = any.simpleObject();

            xhr.get.withArgs(`/${type}`).yields(null, response);

            return assert.becomes(getResources(type), response);
        });

        test('that a fetch error results in a rejected promise', () => {
            const
                type = any.string(),
                error = any.word();

            xhr.get.yields(error);

            return assert.isRejected(getResources(type), new RegExp(error));
        });

    });
});
