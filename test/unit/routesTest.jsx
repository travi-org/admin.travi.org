const
    React = require('react'), //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    reactRouter = require('react-router'),
    Router = reactRouter.Router,
    createHistory = require('history/lib/createMemoryHistory'),

    proxyquire = require('proxyquire'),
    routes = proxyquire('../../lib/routes.jsx', {                       /*eslint-disable no-unused-vars */
        './views/theme/wrap.jsx': React.createClass({
            render: function () {
                return (<div>wrapper { this.props.children }</div>);
            }
        }),
        './views/index.jsx': React => () => <div>index</div>,
        './views/not-found.jsx': React => () => <div>not-found</div>,
        './views/resource-list.jsx': React.createClass({
            render: () => <div>resources</div>
        }),
        './views/resource.jsx': React.createClass({
            render: () => <div>resource</div>                           /*eslint-enable no-unused-vars */
        })
    });

suite('routes', function () {
    'use strict';

    let node;

    beforeEach(function () {
        node = document.createElement('div')
    });

    afterEach(function () {
        dom.unmountComponentAtNode(node)
    });

    test('that the root route is defined', function () {
        dom.render((
            <Router history={createHistory('/')}>
                { routes }
            </Router>
        ), node, function () {
            assert.equals(node.textContent, 'wrapper index');
        });
    });

    test('that the not-found route is defined', function () {
        dom.render((
            <Router history={createHistory('/foo')}>
                { routes }
            </Router>
        ), node, function () {
            assert.equals(node.textContent, 'wrapper not-found');
        });
    });

    test('that the rides route is defined', function () {
        dom.render((
            <Router history={createHistory('/rides')}>
                { routes }
            </Router>
        ), node, function () {
            assert.equals(node.textContent, 'wrapper resources');
        });
    });

    test('that the ride route is defined', function () {
        dom.render((
            <Router history={createHistory('/rides/8')}>
                { routes }
            </Router>
        ), node, function () {
            assert.equals(node.textContent, 'wrapper resource');
        });
    });

    test('that the users route is defined', function () {
        dom.render((
            <Router history={createHistory('/users')}>
                { routes }
            </Router>
        ), node, function () {
            assert.equals(node.textContent, 'wrapper resources');
        });
    });

    test('that the user route is defined', function () {
        dom.render((
            <Router history={createHistory('/users/4')}>
                { routes }
            </Router>
        ), node, function () {
            assert.equals(node.textContent, 'wrapper resource');
        });
    });
});
