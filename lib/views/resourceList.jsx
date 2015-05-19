var React = require('react/addons');

module.exports = React.createClass({
    render: function () {
        return (
            <p>No { this.props.resourceType } are available</p>
        );
    }
});
