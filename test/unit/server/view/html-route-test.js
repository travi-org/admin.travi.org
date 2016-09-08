import Boom from 'boom';
import {register, handler} from '../../../../lib/server/view/html-route';
import * as routeRenderer from '../../../../lib/server/view/route-renderer';
import * as htmlRenderer from '../../../../lib/server/view/html-renderer';
import * as storeCreator from '../../../../lib/shared/store/create';
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
                path: '/html',
                handler
            });
        });
    });

    suite('handler', () => {
        let sandbox, toString;
        const
            store = any.simpleObject(),
            renderedContent = any.string();

        setup(() => {
            toString = sinon.stub();

            sandbox = sinon.sandbox.create();
            sandbox.stub(routeRenderer, 'routeTo');
            sandbox.stub(storeCreator, 'configureStore').returns(store);
            sandbox.stub(htmlRenderer, 'respond');
            sandbox.stub(Boom, 'wrap');
        });

        teardown(() => {
            sandbox.restore();
        });

        test('that html is rendered based on the original route', () => {
            const
                reply = {view: sinon.spy()},
                url = any.url(),
                request = {raw: {req: {url}}},
                title = any.string();
            routeRenderer.routeTo.withArgs(url, store).yields(null, renderedContent);
            toString.returns(title);

            handler(request, reply);

            assert.calledWith(htmlRenderer.respond, reply, {renderedContent, store});
        });

        test('that the error bubbles from the renderer', () => {
            const
                error = any.word(),
                wrappedError = any.word(),
                reply = sinon.spy();
            routeRenderer.routeTo.yields(error);
            Boom.wrap.withArgs(error).returns(wrappedError);

            handler({raw: {req: {url: any.url()}}}, reply);

            assert.calledWith(reply, wrappedError);
        });
    });
});
