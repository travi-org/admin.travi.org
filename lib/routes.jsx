'use strict';

const
    React = require('react'), //eslint-disable-line no-unused-vars
    router = require('react-router'),
    Route = router.Route,

    Index = require('./views/index.jsx');

module.exports = (
    <Route path='/' component={Index} />
);
