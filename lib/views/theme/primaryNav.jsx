var React = require('react/addons');

var Component = React.createClass({
    render: function () {
        'use strict';

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-items">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <h1><a className="navbar-brand" href="/">Travi</a></h1>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-items">
                        <ul className="nav navbar-nav">
                            {this.props.types.map(function (type) {
                                return <li key={type.text} className={ type.active ? 'active' : '' }><a href={type.path}>{type.text}</a></li>;
                            })}
                        </ul>
                    </div>

                </div>
            </nav>
        );
    }
});

module.exports = Component;
