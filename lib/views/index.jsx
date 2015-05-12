var React = require('react/addons'),

    PrimaryNav = require('./theme/primaryNav.jsx');

var Component = React.createClass({
    render: function () {
        return (
            <html>
                <body>
                    <PrimaryNav types={this.props.types} />
                </body>
            </html>
        );
    }
});

module.exports = Component;