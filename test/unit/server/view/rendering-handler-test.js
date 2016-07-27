import proxyquire from 'proxyquire';
import helmet from 'react-helmet';
import * as routeRenderer from '../../../../lib/server/view/route-renderer';
import * as assetManager from '../../../../lib/server/view/asset-manager';
import * as resourcesController from '../../../../lib/server/resources/controller';
import * as storeCreator from '../../../../lib/shared/store/create';
import * as redux from 'redux';
import _ from 'lodash';
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

    let sandbox,
        mediaType,
        request;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(redux, 'createStore');
        sandbox.stub(routeRenderer, 'routeTo');
        sandbox.stub(resourcesController, 'listResourceTypes').yields(null, primaryNav);
        sandbox.stub(helmet, 'rewind');
        sandbox.stub(assetManager, 'getAssets');
        sandbox.stub(storeCreator, 'configureStore');

        request = simpleObject();
        request.url = url();
        mediaType = sinon.stub();
        Negotiator.withArgs(request).returns({mediaType});
    });

    teardown(() => {
        sandbox.restore();
        Negotiator.reset();
    });

    test('that the plugin is defined', () => {
        assert.equals(handler.register.attributes, {
            name: 'rendering-handler'
        });
    });

    test('that a non-html request is forwarded with no modification', () => {
        const
            next = sinon.spy(),
            reply = { continue: sinon.spy() },
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply);
        mediaType.returns('text/foo');

        handler.register({ext: extension}, null, next);

        assert.calledOnce(next);
        assert.calledOnce(reply.continue);
        refute.called(redux.createStore);
    });

    test('that an html request returns a rendered view', () => {
        request.params = {resourceType: primaryNav[2].text};
        request.response = {source: simpleObject()};
        const
            reply = { view: sinon.spy() },
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply),
            renderedContent = string(),
            title = string(),
            reduxState = simpleObject(),
            resources = simpleObject(),
            store = {
                getState: sinon.stub().returns(reduxState),
                dispatch: sinon.spy()
            },
            primaryNavWithActiveLink = _.map(primaryNav, (item, index) => {
                return _.extend({}, item, {active: 2 === index});
            });
        mediaType.returns('text/html');
        storeCreator.configureStore.withArgs({legacy: request.response.source}).returns(store);
        assetManager.getAssets.yields(null, resources);
        helmet.rewind.returns({title: {toString: () => title}});

        handler.register({ext: extension}, null, sinon.spy());

        refute.called(reply.view);

        assert.calledWith(routeRenderer.routeTo, request.url, store);
        routeRenderer.routeTo.yield(null, renderedContent);

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

    test('that error bubbles from requesting resource-types', () => {
        request.response = {};
        const
            reply = sinon.spy(),
            error = simpleObject(),
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply);
        mediaType.returns('text/html');
        resourcesController.listResourceTypes.yields(error);

        handler.register({ext: extension}, null, sinon.spy());

        assert.calledWith(reply, error);
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
            },
            extension = sinon.stub().withArgs('onPreResponse').yields(request, reply);
        mediaType.returns('text/html');
        storeCreator.configureStore.returns(store);

        handler.register({ext: extension}, null, sinon.spy());

        routeRenderer.routeTo.yield(error);

        assert.calledWith(reply, error);
    });
});
