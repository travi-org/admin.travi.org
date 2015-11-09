'use strict';

const
    React = require('react'),
    router = require('react-router'),
    Route = router.Route,
    IndexRoute = router.IndexRoute,

    Wrap = require('./views/theme/wrap.jsx'),
    Index = require('./views/index.jsx')(React),
    ResourceList = require('./views/resource-list.jsx'),
    Resource = require('./views/resource.jsx'),

    NotFound = require('./views/not-found.jsx')(React);

module.exports = <Route path="/" component={Wrap}>
    <IndexRoute component={Index} />
    <Route path="rides" component={ResourceList} />
    <Route path="/rides/:id" component={Resource} />
    <Route path="users" component={ResourceList} />
    <Route path="/users/:id" component={Resource} />
    <Route path="*" component={NotFound}/>
</Route>;
