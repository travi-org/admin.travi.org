import React from 'react';
import {AppContainer} from 'react-hot-loader';
import dom from 'react-dom';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import remountContent from '../../../src/client/renderer';
import Wrapper from '../../../src/client/wrapper';

suite('client-side renderer', () => {
  let sandbox;
  const containerComponent = any.simpleObject();
  const store = any.simpleObject();

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(dom, 'render');
    sandbox.stub(React, 'createElement');
  });

  teardown(() => sandbox.restore());

  test('that the router is remounted', () => {
    const wrapperComponent = any.simpleObject();
    React.createElement.withArgs(Wrapper, {store}).returns(wrapperComponent);
    React.createElement.withArgs(AppContainer, null, wrapperComponent).returns(containerComponent);

    remountContent(store);

    assert.calledWith(dom.render, containerComponent, global.document.getElementById('wrap'));
  });
});
