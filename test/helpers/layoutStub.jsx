var React = require('react/addons');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
});
