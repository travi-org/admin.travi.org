import React from 'react';
import ReactDOMServer from 'react-dom/server';
import sinon from 'sinon';
import {assert} from 'chai';
import proxyquire from 'proxyquire';
import any from '@travi/any';
import {INTERNAL_SERVER_ERROR} from 'http-status-codes';
import * as storeCreator from '../../../../src/shared/store/create';
import ErrorPage from '../../../../src/shared/views/errors/page';
import Root from '../../../../src/shared/views/root/root';
import * as htmlRenderer from '../../../../src/server/view/html-renderer';
import * as primaryNavActions from '../../../../src/shared/views/theme/wrap/duck';

suite('error renderer', () => {
  const Negotiator = sinon.stub();
  const errorRenderer = proxyquire('../../../../src/server/view/error-renderer', {
    negotiator: Negotiator
  });

  suite('plugin', () => {
    test('that the plugin is defined', () => assert.equal(errorRenderer.plugin.name, 'error-renderer'));

    test('that the handler is bound to to onPreResponse', async () => {
      const ext = sinon.spy();

      await errorRenderer.plugin.register({ext});

      assert.calledWith(ext, 'onPreResponse', errorRenderer.handler);
    });
  });

  suite('handler', () => {
    let sandbox, request, erroringRequest, requestLog, mediaType;
    const store = any.simpleObject();
    const state = any.simpleObject();
    const statusCode = any.integer();
    const continueSymbol = any.simpleObject();
    const responseContent = any.simpleObject();

    setup(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(storeCreator, 'configureStore').returns(store);
      sandbox.stub(ReactDOMServer, 'renderToString');
      sandbox.stub(React, 'createElement');
      sandbox.stub(htmlRenderer, 'default');
      sandbox.stub(primaryNavActions, 'loadNav');

      store.dispatch = sinon.stub();
      store.getState = sinon.stub().returns(state);
      mediaType = sinon.stub();
      requestLog = sinon.spy();
      request = {url: {path: any.url()}, setUrl: sinon.spy(), response: {}, log: requestLog};
      erroringRequest = {...request, response: {isBoom: true, output: {statusCode}}};
      Negotiator.withArgs(erroringRequest).returns({mediaType});
    });

    teardown(() => {
      sandbox.restore();
      Negotiator.resetHistory();
    });

    test('that a normal response is not modified', async () => {
      mediaType.returns('text/html');

      const symbol = await errorRenderer.handler(request, {continue: continueSymbol});

      assert.equal(symbol, continueSymbol);
    });

    test('that a boom response for a non-html request is not modified', async () => {
      mediaType.returns('text/foo');

      const symbol = await errorRenderer.handler(erroringRequest, {continue: continueSymbol});

      assert.equal(symbol, continueSymbol);
    });

    test('that a boom response for an html request is rendered to html', async () => {
      const errorPageComponent = any.simpleObject();
      const rootComponent = any.simpleObject();
      const renderedContent = any.string();
      const h = any.simpleObject();
      const loadNavPromise = any.simpleObject();
      mediaType.returns('text/html');
      React.createElement.withArgs(ErrorPage).returns(errorPageComponent);
      React.createElement.withArgs(Root, {store}, errorPageComponent).returns(rootComponent);
      ReactDOMServer.renderToString.withArgs(rootComponent).returns(renderedContent);
      primaryNavActions.loadNav.withArgs(state).returns(loadNavPromise);
      store.dispatch.withArgs(loadNavPromise).resolves();
      htmlRenderer.default
        .withArgs(h, {renderedContent, store, status: statusCode, boomDetails: {statusCode}})
        .resolves(responseContent);

      const res = await errorRenderer.handler(erroringRequest, h);

      assert.equal(res, responseContent);
      assert.calledWith(requestLog, ['error', statusCode], erroringRequest.response);
    });

    test('that a failure to fetch the primary nav still renders the error as html', async () => {
      const errorPageComponent = any.simpleObject();
      const rootComponent = any.simpleObject();
      const renderedContent = any.string();
      const h = any.simpleObject();
      const error = new Error(any.word());
      mediaType.returns('text/html');
      React.createElement.withArgs(ErrorPage).returns(errorPageComponent);
      React.createElement.withArgs(Root, {store}, errorPageComponent).returns(rootComponent);
      ReactDOMServer.renderToString.withArgs(rootComponent).returns(renderedContent);
      store.dispatch = sinon.stub().rejects(error);
      htmlRenderer.default
        .withArgs(h, {
          renderedContent,
          store,
          status: INTERNAL_SERVER_ERROR,
          boomDetails: {statusCode: INTERNAL_SERVER_ERROR}
        })
        .resolves(responseContent);

      const res = await errorRenderer.handler(erroringRequest, h);

      assert.equal(res, responseContent);
      assert.calledWith(requestLog, ['error', statusCode], erroringRequest.response);
      assert.calledWith(requestLog, ['error', INTERNAL_SERVER_ERROR], error);
    });
  });
});
