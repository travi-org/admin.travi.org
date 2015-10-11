var React = require('react/addons');

module.exports = React.createClass({
    render: function () {
        return (
            <span id="primary-nav">
                <ul id="nav-items">
                    {this.props.types.map(function () {
                        return <li/>;
                    })}
                </ul>
            </span>
        );
    }
});
