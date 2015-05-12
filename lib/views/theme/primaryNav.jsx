var React = require('react/addons');

var Component = React.createClass({
    render: function () {
        return (
            <nav>
                <ul>
                    {this.props.types.map(function (type) {
                        return <li>{type}</li>
                    })}
                </ul>
            </nav>
        );
    }
});

module.exports = Component;