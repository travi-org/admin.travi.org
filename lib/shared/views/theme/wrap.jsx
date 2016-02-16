'use strict';

const
    React = require('react'),
    connect = require('react-redux').connect,
    PrimaryNav = require('./primary-nav.jsx'),

    Wrap = React.createClass({
        render() {
            return (
                <div className="container">
                    <PrimaryNav primaryNav={this.props.primaryNav}/>
                    { this.props.children }
                </div>
            );
        }
    });

module.exports = connect((state) => {
    return {
        primaryNav: state.get('primaryNav').toJS()
    };
})(Wrap);
