var React = require('react/addons'),

    Layout = require('./layout/layout.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <Layout types={this.props.types}>
                <div className="jumbotron">
                    <h2>Reference API Client</h2>
                    <p>
                        Administration for Travi.org
                    </p>
                </div>
            </Layout>
        );
    }
});
