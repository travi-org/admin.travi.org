'use strict';

const
    React = require('react'), //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    reactRouter = require('react-router'),
    createHistory = require('history/lib/createMemoryHistory'),
    DataWrapper = require('../../lib/server/view/temp-data-wrapper'),
    proxyquire = require('proxyquire');

suite('routes', function () {
    const
        Router = reactRouter.Router,
        routes = proxyquire('../../lib/routes.jsx', {
            './views/theme/wrap.jsx': React.createClass({
                render() {
                    return <div>wrapper { this.props.children }</div>;
                }
            }),
            './views/index.jsx': (React) => () => <div>index</div>,             //eslint-disable-line no-shadow
            './views/not-found.jsx': (React) => () => <div>not-found</div>,     //eslint-disable-line no-shadow
            './views/resource-list.jsx': React.createClass({
                render: () => <div>resources</div>
            }),
            './views/resource.jsx': React.createClass({
                render: () => <div>resource</div>
            })
        });
    let node;

    beforeEach(function () {
        node = document.createElement('div');
    });

    afterEach(function () {
        dom.unmountComponentAtNode(node);
    });

    test('that the root route is defined', function () {
        dom.render(
            <DataWrapper data={{}} >
                <Router history={createHistory('/')}>
                    { routes }
                </Router>
            </DataWrapper>, node, function () {
                assert.equals(node.textContent, 'wrapper index');
            }
        );
    });

    test('that the not-found route is defined', function () {
        dom.render(
            <DataWrapper data={{}} >
                <Router history={createHistory('/foo')}>
                    { routes }
                </Router>
            </DataWrapper>, node, function () {
                assert.equals(node.textContent, 'wrapper not-found');
            }
        );
    });

    test('that the rides route is defined', function () {
        dom.render(
            <DataWrapper data={{}} >
                <Router history={createHistory('/rides')}>
                    { routes }
                </Router>
            </DataWrapper>, node, function () {
                assert.equals(node.textContent, 'wrapper resources');
            }
        );
    });

    test('that the ride route is defined', function () {
        dom.render(
            <DataWrapper data={{}} >
                <Router history={createHistory('/rides/8')}>
                    { routes }
                </Router>
            </DataWrapper>, node, function () {
                assert.equals(node.textContent, 'wrapper resource');
            }
        );
    });

    test('that the users route is defined', function () {
        dom.render(
            <DataWrapper data={{}} >
                <Router history={createHistory('/users')}>
                    { routes }
                </Router>
            </DataWrapper>, node, function () {
                assert.equals(node.textContent, 'wrapper resources');
            }
        );
    });

    test('that the user route is defined', function () {
        dom.render(
            <DataWrapper data={{}} >
                <Router history={createHistory('/users/4')}>
                    { routes }
                </Router>
            </DataWrapper>, node, function () {
                assert.equals(node.textContent, 'wrapper resource');
            }
        );
    });
});
