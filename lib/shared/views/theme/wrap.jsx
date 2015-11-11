'use strict';

const
    React = require('react'),
    PrimaryNav = require('./primary-nav.jsx');

module.exports = React.createClass({
    contextTypes: {
        data: React.PropTypes.object.isRequired
    },

    render() {
        return <div className="container">
            <PrimaryNav {...this.context.data} />
            { this.props.children }
        </div>;
    }
});
