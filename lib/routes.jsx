'use strict';

const
    React = require('react'),
    router = require('react-router'),
    Route = router.Route,
    IndexRoute = router.IndexRoute,

    Wrap = require('./views/theme/wrap.jsx'),
    Index = require('./views/index.jsx')(React),
    ResourceList = require('./views/resourceList.jsx'),

    NotFound = require('./views/not-found.jsx')(React);

module.exports = (
    <Route path='/' component={Wrap}>
        <IndexRoute component={Index} />
        <Route path='rides' component={ResourceList} />
        <Route path='users' component={ResourceList} />
        <Route path="*" component={NotFound}/>
    </Route>
);
