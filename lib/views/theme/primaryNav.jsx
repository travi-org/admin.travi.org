var React = require('react/addons');

var Component = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <h1 className="navbar-header">
                        <a className="navbar-brand" href="/">Travi</a>
                    </h1>

                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            {this.props.types.map(function (type) {
                                return <li><a href={'/' + type}>{type}</a></li>
                            })}
                        </ul>
                    </div>

                </div>
            </nav>
        );
    }
});

module.exports = Component;
