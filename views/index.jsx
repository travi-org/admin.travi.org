var React = require('react/addons');

var Component = React.createClass({
    render: function () {

        return (
            <html>
                <body>
                    <ul>
                    {this.props.types.map(function (type) {
                        return <li>{type}</li>
                    })}
                    </ul>
                </body>
            </html>
        );
    }
});

module.exports = Component;