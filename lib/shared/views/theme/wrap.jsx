'use strict';

const
    react = require('react'),
    connect = require('react-redux').connect,
    PrimaryNav = require('./primary-nav.jsx')(react);

function wrap(React) {
    return (props) => (
        <div className="container">
            <PrimaryNav primaryNav={props.primaryNav}/>
            { props.children }
        </div>
    );
}

module.exports = connect((state) => {
    return {
        primaryNav: state.get('primaryNav').toJS()
    };
})(wrap(react));
