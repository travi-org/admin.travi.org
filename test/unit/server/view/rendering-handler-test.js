import proxyquire from 'proxyquire';
import helmet from 'react-helmet';
import * as routeRenderer from '../../../../lib/server/view/route-renderer';
import * as assetManager from '../../../../lib/server/view/asset-manager';
import * as resourcesController from '../../../../lib/server/resources/controller';
import * as storeCreator from '../../../../lib/shared/store/create';
import * as redux from 'redux';
import {string, simpleObject, listOf, url} from '@travi/any';
import sinon from 'sinon';
import {assert, refute} from 'referee';

suite('rendering handler', () => {
    const
        Negotiator = sinon.stub(),
        handler = proxyquire('../../../../lib/server/view/rendering-handler', {
            'negotiator': Negotiator
        }),
        primaryNav = listOf(() => ({text: string()}), {min: 5});

    let sandbox, mediaType, request;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(redux, 'createStore');
        sandbox.stub(routeRenderer, 'routeTo');
        sandbox.stub(resourcesController, 'listResourceTypes').resolves(primaryNav);
        sandbox.stub(helmet, 'rewind');
        sandbox.stub(assetManager, 'getAssets');
        sandbox.stub(storeCreator, 'configureStore');

        request = {...simpleObject(), url: url()};
        mediaType = sinon.stub();
        Negotiator.withArgs(request).returns({mediaType});
    });

    teardown(() => {
        sandbox.restore();
        Negotiator.reset();
    });

    test('that the plugin is defined', () => {
        const
            extension = sinon.stub(),
            next = sinon.spy();

        assert.equals(handler.register.attributes, {
            name: 'rendering-handler'
        });

        handler.register({ext: extension}, null, next);

        assert.calledWith(extension, 'onPreResponse', handler.handleRendering);
        assert.calledOnce(next);
    });

    test('that a non-html request is forwarded with no modification', () => {
        const reply = {continue: sinon.spy() };
        mediaType.returns('text/foo');

        return handler.handleRendering(request, reply).then(() => {
            assert.calledOnce(reply.continue);
            refute.called(redux.createStore);
        });
    });

    test('that an html request returns a rendered view', () => {
        request.params = {resourceType: primaryNav[2].text};
        request.response = {source: simpleObject()};
        const
            reply = { view: sinon.spy() },
            renderedContent = string(),
            title = string(),
            reduxState = simpleObject(),
            resources = simpleObject(),
            store = {
                getState: sinon.stub().returns(reduxState),
                dispatch: sinon.spy()
            },
            primaryNavWithActiveLink = primaryNav.map((item, index) => {
                return {...item, active: 2 === index};
            });
        mediaType.returns('text/html');
        storeCreator.configureStore.returns(store);
        assetManager.getAssets.yields(null, resources);
        helmet.rewind.returns({title: {toString: () => title}});
        routeRenderer.routeTo.withArgs(request.url, store).yields(null, renderedContent);

        return handler.handleRendering(request, reply).then(() => {
            assert.calledWith(store.dispatch, {
                type: 'SET_PRIMARY_NAV',
                nav: primaryNavWithActiveLink
            });
            assert.calledWith(reply.view, 'layout/layout', {
                renderedContent,
                initialState: JSON.stringify(reduxState),
                title,
                resources
            });
        });
    });

    test('that error bubbles from requesting resource-types', () => {
        request.response = {};
        const
            reply = sinon.spy(),
            error = simpleObject();
        mediaType.returns('text/html');
        resourcesController.listResourceTypes.rejects(error);

        return handler.handleRendering(request, reply).catch(() => {
            assert.calledWith(reply, error);
        });
    });

    test('that error bubbles from routing to a view', () => {
        request.params = {resourceType: primaryNav[2].text};
        request.response = {};
        const
            reply = sinon.spy(),
            error = simpleObject(),
            reduxState = simpleObject(),
            store = {
                getState: sinon.stub().returns(reduxState),
                dispatch: sinon.spy()
            };
        mediaType.returns('text/html');
        storeCreator.configureStore.returns(store);
        routeRenderer.routeTo.yields(error);

        return handler.handleRendering(request, reply).catch(() => {
            assert.calledWith(reply, error);
        });
    });
});
