'use strict';

const
    React = require('react'),
    connect = require('react-redux').connect,
    PrimaryNav = require('./primary-nav.jsx')(React),

    Wrap = (React) => (props) => (
        <div className="container">
            <PrimaryNav primaryNav={props.primaryNav}/>
            { props.children }
        </div>
    );

module.exports = connect((state) => {
    return {
        primaryNav: state.get('primaryNav').toJS()
    };
})(Wrap(React));
