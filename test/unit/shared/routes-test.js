import React from 'react';
import dom from 'react-dom';
import {Router, createMemoryHistory} from 'react-router';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {assert} from 'chai';

suite('routes', () => {
    const routesFactory = proxyquire('../../../lib/shared/routes', {
        './views/theme/wrap/connected-wrap': {
            default: (React) => (props) => <div>wrapper { props.children }</div>    //eslint-disable-line no-shadow
        },
        '@travi/admin.travi.org-components': {
            createIndex: (React) => () => <div>index</div>,                         //eslint-disable-line no-shadow
            createNotFound: (React) => () => <div>not-found</div>                   //eslint-disable-line no-shadow
        },
        './views/resources/list/connected-list': {
            default: (React) => () => <div>resources</div>                          //eslint-disable-line no-shadow
        },
        './views/resources/individual/connected-resource': {
            default: (React) => () => <div>resource</div>                           //eslint-disable-line no-shadow
        },
        './views/resources/individual/users/connected-user': {
            default: (React) => () => <div>user</div>                               //eslint-disable-line no-shadow
        }
    }).default;
    let node, hydrater, routes;

    beforeEach(() => {
        hydrater = sinon.spy();
        routes = routesFactory(hydrater);
        node = document.createElement('div');
    });

    afterEach(() => {
        hydrater = null;
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
                assert.notCalled(hydrater);
            }
        );
    });

    test('that the rides route is defined', () => {
        dom.render(
            <Router history={createMemoryHistory('/rides')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper resources');
                assert.calledOnce(hydrater);
            }
        );
    });

    test('that the ride route is defined', () => {
        dom.render(
            <Router history={createMemoryHistory('/rides/8')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper resource');
                assert.calledOnce(hydrater);
            }
        );
    });

    test('that the users route is defined', () => {
        dom.render(
            <Router history={createMemoryHistory('/users')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper resources');
                assert.calledOnce(hydrater);
            }
        );
    });

    test('that the user route is defined', () => {
        dom.render(
            <Router history={createMemoryHistory('/users/4')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper user');
                assert.calledOnce(hydrater);
            }
        );
    });
});
