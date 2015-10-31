var React = require('react');

module.exports = React.createClass({
    render: function () {
        'use strict';

        let list;

        function renderNavLink(type) {
            return <li key={type.text} className={ type.active ? 'active' : '' }><a href={type.path}>{type.text}</a></li>;
        }

        if (this.props.primaryNav) {
            list = <div className="collapse navbar-collapse" id="navbar-items">
                <ul className="nav navbar-nav">
                    {this.props.primaryNav.map(renderNavLink)}
                </ul>
            </div>;
        }

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
                            {list}
                        </ul>
                    </div>

                </div>
            </nav>
        );
    }
});
