var React = require('react'),

    Layout = require('./layout/layout.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <Layout types={this.props.types}>

            </Layout>
        )
    }
});
