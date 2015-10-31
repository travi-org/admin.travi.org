var React = require('react'),

    PrimaryNav = require('./primaryNav.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <div id="wrap" className="container">
                <PrimaryNav primaryNav={this.props.types} />
                { this.props.children }
            </div>
        );
    }
});
