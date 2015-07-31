var React = require('react'),

    Layout = require('./layout/layout.jsx');

module.exports = React.createClass({
    render: function () {
        'use strict';

        return (
            <Layout types={this.props.types}>

            </Layout>
        );
    }
});
