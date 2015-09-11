var React = require('react'),

    PrimaryNav = require('./primaryNav.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <div id="wrap">
                <PrimaryNav types={this.props.types} />
            </div>
        );
    }
});
