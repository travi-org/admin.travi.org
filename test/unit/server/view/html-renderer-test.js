import helmet from 'react-helmet';
import Boom from 'boom';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import respond from '../../../../src/server/view/html-renderer';
import * as assetManager from '../../../../src/server/view/asset-manager';

function assertRequiredDataPassedToLayoutTemplate(reply, {renderedContent, resources, state, title}) {
  assert.calledWith(reply.view, 'layout', sinon.match({
    renderedContent,
    resources,
    title,
    initialState: JSON.stringify(state)
  }));
}

suite('html renderer', () => {
  let sandbox;
  const reply = sinon.spy();
  const store = {};
  const response = {};
  const resources = any.simpleObject();
  const renderedContent = any.string();
  const title = any.string();
  const status = any.integer();

  setup(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(helmet, 'rewind').returns({title: {toString: () => title}});
    sandbox.stub(assetManager, 'default').resolves(resources);
    sandbox.stub(Boom, 'wrap');

    response.code = sinon.spy();
    reply.view = sinon.stub().returns(response);
  });

  teardown(() => {
    sandbox.restore();
    reply.reset();
  });

  test('that appropriate data is passed to the layout template', () => {
    const state = any.simpleObject();
    store.getState = sinon.stub().returns(state);

    respond(reply, {renderedContent, store, status}).then(() => {
      assertRequiredDataPassedToLayoutTemplate(reply, {renderedContent, resources, state, title});
      assert.calledWith(response.code, status);
    });
  });

  test('that single-quotes get escaped in the dumped store state', () => {
    const view = sinon.stub();
    const code = sinon.spy();
    const state = {...any.simpleObject(), textWithSingleQuote: "doesn't this cause problems if it isn't escaped?"};
    const getState = () => state;
    view.withArgs('layout', sinon.match({
      renderedContent,
      resources,
      title,
      initialState: JSON.stringify(state).replace(/'/g, "\\'")
    })).returns({code});

    return respond({view}, {renderedContent, store: {getState}, status}).then(() => assert.calledWith(code, status));
  });

  test('that double-quotes get double escaped so the JSON', () => {
    const view = sinon.stub();
    const code = sinon.spy();
    const state = {
      ...any.simpleObject(),
      textWithEscapedDoubleQuote: "doesn't this cause problems if it isn't \"escaped\"?"
    };
    const getState = () => state;
    view.withArgs('layout', sinon.match({
      renderedContent,
      resources,
      title,
      initialState: JSON.stringify(state).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    })).returns({code});

    return respond({view}, {renderedContent, store: {getState}, status}).then(() => assert.calledWith(code, status));
  });

  // https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0
  test('that html entities get escaped to prevent XSS attacks', () => {
    const view = sinon.stub();
    const code = sinon.spy();
    const state = {
      ...any.simpleObject(),
      textWithHTML: 'as</script><script>alert("You have an XSS bug/vulnerability!")</script>'
    };
    const getState = () => state;
    view.withArgs('layout', sinon.match({
      renderedContent,
      resources,
      title,
      initialState: JSON.stringify(state)
        .replace(/\\/g, '\\\\')
        .replace(/</g, '\\\\u003C')
        .replace(/\//g, '\\\\u002F')
        .replace(/>/g, '\\\\u003E')
    })).returns({code});

    return respond({view}, {renderedContent, store: {getState}, status}).then(() => assert.calledWith(code, status));
  });

  test('that an error response sets the status code and passes boom data to the layout template', () => {
    const boomDetails = {...any.simpleObject(), statusCode: any.integer()};
    const code = sinon.stub();
    const state = any.simpleObject();
    store.getState = sinon.stub().returns(state);
    reply.view.withArgs('layout', sinon.match({boom: JSON.stringify(boomDetails)})).returns({code});
    code.withArgs(status).returns(response);

    return respond(reply, {renderedContent, store, status, boomDetails}).then(() => {
      assertRequiredDataPassedToLayoutTemplate(reply, {renderedContent, resources, state, title});
      assert.calledWith(response.code, boomDetails.statusCode);
    });
  });

  test('that an error getting asset details results in an immediate error response', () => {
    const error = any.simpleObject();
    const wrappedError = any.simpleObject();
    assetManager.default.rejects(error);
    Boom.wrap.withArgs(error).returns(wrappedError);

    return respond(reply, {renderedContent, store}).then(() => assert.calledWith(reply, wrappedError));
  });
});
