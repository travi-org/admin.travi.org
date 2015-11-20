'use strict';

const React = require('react');

module.exports = React.createClass({
    render() {
        return <span id="primary-nav">
            <ul id="nav-items">
                {this.props.primaryNav.map((type) => {
                    return <li key={type} />;
                })}
            </ul>
        </span>;
    }
});
