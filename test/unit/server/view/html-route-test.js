import helmet from 'react-helmet';
import Boom from 'boom';
import {register, handler} from '../../../../lib/server/view/html-route';
import * as routeRenderer from '../../../../lib/server/view/route-renderer';
import * as assetManager from '../../../../lib/server/view/asset-manager';
import * as storeCreactor from '../../../../lib/shared/store/create';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';

suite('html route', () => {
    suite('plugins', () => {
        test('that the plugin is defined', () => {
            assert.deepEqual(register.attributes, {
                name: 'html-route'
            });
        });

        test('that the request for html is handled', () => {
            const
                next = sinon.spy(),
                server = {route: sinon.spy()};

            register(server, null, next);

            assert.calledOnce(next);
            assert.calledWith(server.route, {
                method: 'GET',
                path: '/html/mime/type/hack/{path*}',
                handler
            });
        });
    });

    suite('handler', () => {
        let sandbox, toString;
        const
            store = any.simpleObject(),
            state = any.simpleObject();

        setup(() => {
            store.getState = sinon.stub().returns(state);
            toString = sinon.stub();

            sandbox = sinon.sandbox.create();
            sandbox.stub(routeRenderer, 'routeTo');
            sandbox.stub(storeCreactor, 'configureStore').returns(store);
            sandbox.stub(assetManager, 'getAssets');
            sandbox.stub(helmet, 'rewind').returns({title: {toString}});
            sandbox.stub(Boom, 'wrap');
        });

        teardown(() => {
            sandbox.restore();
        });

        test('that html is rendered based on the original route', () => {
            const
                renderedContent = any.string(),
                reply = {view: sinon.spy()},
                request = {params: {path: any.url()}},
                resources = any.simpleObject(),
                title = any.string();
            routeRenderer.routeTo.withArgs(`/${request.params.path}`, store).yields(null, renderedContent);
            assetManager.getAssets.yields(null, resources);
            toString.returns(title);

            handler(request, reply);

            assert.calledWith(reply.view, 'layout', {
                renderedContent,
                resources,
                title,
                initialState: JSON.stringify(state)
            });
        });

        test('that html is rendered based on the root route', () => {
            const
                renderedContent = any.string(),
                reply = {view: sinon.spy()},
                request = {params: {path: undefined}};
            routeRenderer.routeTo.withArgs('/', store).yields(null, renderedContent);
            assetManager.getAssets.yields();

            handler(request, reply);

            assert.calledWith(reply.view, 'layout');
        });

        test('that the error bubbles from the renderer', () => {
            const
                error = any.word(),
                wrappedError = any.word(),
                reply = sinon.spy();
            routeRenderer.routeTo.yields(error);
            Boom.wrap.withArgs(error).returns(wrappedError);

            handler({params: any.simpleObject()}, reply);

            assert.calledWith(reply, wrappedError);
        });

        test('that the error bubbles from the asset manager', () => {
            const
                error = any.word(),
                reply = sinon.spy();
            routeRenderer.routeTo.yields(null, any.string());
            assetManager.getAssets.yields(error);

            handler({params: any.simpleObject()}, reply);

            assert.calledWith(reply, error);
        });
    });
});
