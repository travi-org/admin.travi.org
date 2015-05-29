var React = require('react/addons'),

    Layout = require('./index.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <Layout types={this.props.types}>
                <p className="alert alert-info">No { this.props.resourceType } are available</p>
            </Layout>
        );
    }
});
