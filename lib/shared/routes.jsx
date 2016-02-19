'use strict';

const
    React = require('react'),
    router = require('react-router'),
    Route = router.Route,
    IndexRoute = router.IndexRoute,

    Wrap = require('./views/theme/wrap.jsx')(React),
    Index = require('./views/index.jsx')(React),
    ResourceList = require('./views/resource-list.jsx'),
    Resource = require('./views/resource.jsx'),

    NotFound = require('./views/errors/not-found.jsx')(React);

module.exports = (hydrate) => (
    <Route path="/" component={Wrap}>
        <IndexRoute component={Index} />
        <Route path="/:type" component={ResourceList} onEnter={hydrate} />
        <Route path="/:type/:id" component={Resource} onEnter={hydrate} />
        <Route path="*" component={NotFound}/>
    </Route>
);
