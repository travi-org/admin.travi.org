var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <span id="primary-nav">
                <ul id="nav-items">
                    {this.props.types.map(function (type) {
                        return <li key={type} />;
                    })}
                </ul>
            </span>
        );
    }
});
