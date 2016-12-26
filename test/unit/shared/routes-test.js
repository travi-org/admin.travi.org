import React from 'react';
import dom from 'react-dom';
import {Router, createMemoryHistory} from 'react-router';
import proxyquire from 'proxyquire';
import {assert} from 'chai';

suite('routes', () => {
  const routes = proxyquire('../../../lib/shared/routes', {
    './views/theme/wrap/component': {
      default: props => <div>wrapper { props.children }</div>     // eslint-disable-line no-shadow
    },
    '@travi/admin.travi.org-components': {
      Index: () => <div>index</div>,                              // eslint-disable-line no-shadow
      NotFound: () => <div>not-found</div>                        // eslint-disable-line no-shadow
    },
    './views/resources/list/connected-list': {
      default: () => <div>resources</div>                         // eslint-disable-line no-shadow
    },
    './views/resources/individual/connected-resource': {
      default: () => <div>resource</div>                          // eslint-disable-line no-shadow
    },
    './views/persons/individual/component': {
      default: () => <div>person</div>                            // eslint-disable-line no-shadow
    }
  }).getRoutes();
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    dom.unmountComponentAtNode(node);
  });

  test('that the root route is defined', () => {
    dom.render(
      <Router history={createMemoryHistory('/')}>
        { routes }
      </Router>, node, () => {
        assert.equal(node.textContent, 'wrapper index');
      }
    );
  });

  test('that the not-found route is defined', () => {
    dom.render(
      <Router history={createMemoryHistory('/foo/bar/baz')}>
        { routes }
      </Router>, node, () => {
        assert.equal(node.textContent, 'wrapper not-found');
      }
    );
  });

  test('that the rides route is defined', () => {
    dom.render(
      <Router history={createMemoryHistory('/rides')}>
        { routes }
      </Router>, node, () => {
        assert.equal(node.textContent, 'wrapper resources');
      }
    );
  });

  test('that the ride route is defined', () => {
    dom.render(
      <Router history={createMemoryHistory('/rides/8')}>
        { routes }
      </Router>, node, () => {
        assert.equal(node.textContent, 'wrapper resource');
      }
    );
  });

  test('that the users route is defined', () => {
    dom.render(
      <Router history={createMemoryHistory('/users')}>
        { routes }
      </Router>, node, () => {
        assert.equal(node.textContent, 'wrapper resources');
      }
    );
  });

  test('that the user route is defined', () => {
    dom.render(
      <Router history={createMemoryHistory('/persons/4')}>
        { routes }
      </Router>, node, () => {
        assert.equal(node.textContent, 'wrapper person');
      }
    );
  });
});
