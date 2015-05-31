var React = require('react/addons'),

    Styles = require('./styles.jsx'),
    PrimaryNav = require('../theme/primaryNav.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Permanent+Marker:regular" />
                    <Styles />
                </head>
                <body>
                    <PrimaryNav types={this.props.types} />
                    <div id="content" className="container">

                    </div>
                </body>
            </html>
        );
    }
});
