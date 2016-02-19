'use strict';

const
    React = require('react'), //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    reactRouter = require('react-router'),
    proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    assert = require('chai').assert;

suite('routes', () => {
    const
        Router = reactRouter.Router,
        routesFactory = proxyquire('../../../lib/shared/routes.jsx', {
            './views/theme/wrap.jsx': (React) => (props) => (                       //eslint-disable-line no-shadow
                <div>wrapper { props.children }</div>
            ),
            './views/index.jsx': (React) => () => <div>index</div>,                 //eslint-disable-line no-shadow
            './views/errors/not-found.jsx': (React) => () => <div>not-found</div>,  //eslint-disable-line no-shadow
            './views/resource-list.jsx': () => <div>resources</div>,
            './views/resource.jsx': () => <div>resource</div>
        });
    let node,
        hydrater,
        routes;

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
            <Router history={reactRouter.createMemoryHistory('/')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper index');
            }
        );
    });

    test('that the not-found route is defined', () => {
        dom.render(
            <Router history={reactRouter.createMemoryHistory('/foo/bar/baz')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper not-found');
                assert.notCalled(hydrater);
            }
        );
    });

    test('that the rides route is defined', () => {
        dom.render(
            <Router history={reactRouter.createMemoryHistory('/rides')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper resources');
                assert.calledOnce(hydrater);
            }
        );
    });

    test('that the ride route is defined', () => {
        dom.render(
            <Router history={reactRouter.createMemoryHistory('/rides/8')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper resource');
                assert.calledOnce(hydrater);
            }
        );
    });

    test('that the users route is defined', () => {
        dom.render(
            <Router history={reactRouter.createMemoryHistory('/users')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper resources');
                assert.calledOnce(hydrater);
            }
        );
    });

    test('that the user route is defined', () => {
        dom.render(
            <Router history={reactRouter.createMemoryHistory('/users/4')}>
                { routes }
            </Router>, node, () => {
                assert.equal(node.textContent, 'wrapper resource');
                assert.calledOnce(hydrater);
            }
        );
    });
});
