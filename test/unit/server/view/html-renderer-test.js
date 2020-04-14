import {Helmet} from 'react-helmet';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import respond from '../../../../src/server/view/html-renderer';
import * as assetManager from '../../../../src/server/view/asset-manager';

suite('html renderer', () => {
  let sandbox;
  const h = sinon.spy();
  const store = {};
  const response = {};
  const resources = any.simpleObject();
  const renderedContent = any.string();
  const responseContent = any.simpleObject();
  const title = any.string();
  const status = any.integer();

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(Helmet, 'rewind').returns({title: {toString: () => title}});
    sandbox.stub(assetManager, 'default').resolves(resources);

    response.code = sinon.stub();
    h.view = sinon.stub().returns(response);
  });

  teardown(() => {
    sandbox.restore();
    h.resetHistory();
  });

  test('that appropriate data is passed to the layout template', () => {
    const state = any.simpleObject();
    store.getState = sinon.stub().returns(state);
    h.view
      .withArgs('layout', {renderedContent, resources, title, initialState: JSON.stringify(state)})
      .returns(response);
    response.code.withArgs(status).returns(responseContent);

    return assert.becomes(respond(h, {renderedContent, store, status}), responseContent);
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
        .replace(/</g, '\\u003C')
        .replace(/\//g, '\\u002F')
        .replace(/>/g, '\\u003E')
    })).returns({code});

    return respond({view}, {renderedContent, store: {getState}, status}).then(() => assert.calledWith(code, status));
  });

  test('that an error response sets the status code and passes boom data to the layout template', () => {
    const boomDetails = {...any.simpleObject(), statusCode: any.integer()};
    const state = any.simpleObject();
    store.getState = () => state;
    h.view.withArgs(
      'layout',
      {renderedContent, resources, title, initialState: JSON.stringify(state), boom: JSON.stringify(boomDetails)}
    ).returns(response);
    response.code.withArgs(boomDetails.statusCode).returns(responseContent);

    return assert.becomes(respond(h, {renderedContent, store, status, boomDetails}), responseContent);
  });

  test('that an error getting asset details results in an immediate error response', () => {
    const error = new Error('cause');
    assetManager.default.rejects(error);

    return assert.isRejected(respond(h, {renderedContent, store}), error);
  });
});
