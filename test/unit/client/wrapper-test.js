/* global window */
/* eslint no-underscore-dangle: ["error", { "allow": ["__BOOM__"] }]*/
import {parse} from 'url';
import React from 'react';
import {browserHistory} from 'react-router';
import ga from 'react-ga';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import sinon from 'sinon';
import jsdom from 'jsdom';
import any from '@travi/any';
import * as routes from '../../../src/shared/routes';
import Wrapper from '../../../src/client/wrapper';

suite('wrapper for hot reloading', () => {
  let sandbox;
  const store = any.simpleObject();
  const routeConfig = <div />;
  const url = any.url();
  const statusCode = any.integer();

  setup(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(routes, 'getRoutes');
    sandbox.stub(ga, 'pageview');

    jsdom.changeURL(window, url);
  });

  teardown(() => {
    sandbox.restore();
    window.__BOOM__ = null;
  });

  test('that the router is remounted', () => {
    routes.getRoutes.returns(routeConfig);
    const wrapper = shallow(<Wrapper store={store} />);
    const root = wrapper.find('Root');
    const router = root.find('Router');

    assert.equal(root.prop('store'), store);
    assert.equal(router.prop('history'), browserHistory);
    assert.equal(router.prop('children'), routeConfig);

    assert.notCalled(ga.pageview);
    router.prop('onUpdate')();

    assert.calledWith(ga.pageview, parse(url).pathname);
  });

  test('that the error page is mounted when response was a Boom', () => {
    window.__BOOM__ = {...any.simpleObject(), statusCode};
    const wrapper = shallow(<Wrapper store={store} />);
    const errorPage = wrapper.find('ErrorPage');

    assert.equal(errorPage.prop('statusCode'), statusCode);
  });
});
