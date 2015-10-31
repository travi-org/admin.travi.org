var React = require('react'),

    PrimaryNav = require('./primaryNav.jsx');

module.exports = React.createClass({
    contextTypes: {
        data: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <div id="wrap" className="container">
                <PrimaryNav {...this.context.data} />
                { this.props.children }
            </div>
        );
    }
});
