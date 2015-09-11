var React = require('react'),

    Wrap = require('./theme/wrap.jsx');

module.exports = React.createClass({
    render: function () {
        'use strict';

        return (
            <Wrap types={this.props.types}>
                <div className="jumbotron">
                    <h2>Reference API Client</h2>
                    <p>Administration for Travi.org</p>
                </div>
            </Wrap>
        );
    }
});
