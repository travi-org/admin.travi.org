import helmet from 'react-helmet';
import Boom from 'boom';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import respond from '../../../../lib/server/view/html-renderer';
import * as assetManager from '../../../../lib/server/view/asset-manager';

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
  const state = any.simpleObject();
  const title = any.string();
  const status = any.integer();

  setup(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(helmet, 'rewind').returns({title: {toString: () => title}});
    sandbox.stub(assetManager, 'default').yields(null, resources);
    sandbox.stub(Boom, 'wrap');

    response.code = sinon.spy();
    reply.view = sinon.stub().returns(response);
    store.getState = sinon.stub().returns(state);
  });

  teardown(() => {
    sandbox.restore();
    reply.reset();
  });

  test('that appropriate data is passed to the layout template', () => {
    respond(reply, {renderedContent, store, status});

    assertRequiredDataPassedToLayoutTemplate(reply, {renderedContent, resources, state, title});
    assert.calledWith(response.code, status);
  });

  test('that an error response sets the status code and passes boom data to the layout template', () => {
    const boomDetails = {...any.simpleObject(), statusCode: any.integer()};
    const code = sinon.stub();
    reply.view.withArgs('layout', sinon.match({boom: JSON.stringify(boomDetails)})).returns({code});
    code.withArgs(status).returns(response);

    respond(reply, {renderedContent, store, status, boomDetails});

    assertRequiredDataPassedToLayoutTemplate(reply, {renderedContent, resources, state, title});
    assert.calledWith(response.code, boomDetails.statusCode);
  });

  test('that an error getting asset details results in an immediate error response', () => {
    const error = any.simpleObject();
    const wrappedError = any.simpleObject();
    assetManager.default.yields(error);
    Boom.wrap.withArgs(error).returns(wrappedError);

    respond(reply, {renderedContent, store});

    assert.calledWith(reply, wrappedError);
  });
});
