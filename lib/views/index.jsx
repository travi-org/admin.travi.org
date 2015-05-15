var React = require('react/addons'),

    Styles = require('./layout/styles.jsx'),
    PrimaryNav = require('./theme/primaryNav.jsx');

var Component = React.createClass({
    render: function () {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Permanent+Marker:regular" />
                    <Styles />
                </head>
                <body>
                    <PrimaryNav types={this.props.types} />
                </body>
            </html>
        );
    }
});

module.exports = Component;
