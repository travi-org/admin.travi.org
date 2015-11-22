'use strict';

const
    React = require('react'),
    PrimaryNav = require('./primary-nav.jsx'),
    repository = require('../../../client/repository');

module.exports = React.createClass({
    statics: {
        loadProps(params, callback) {
            repository.getResourceTypes(callback);
        }
    },

    render() {
        return <div className="container">
            <PrimaryNav primaryNav={this.props.primaryNav} />
            { this.props.children }
        </div>;
    }
});
