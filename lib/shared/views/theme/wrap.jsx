'use strict';

const connect = require('react-redux').connect;

function wrap(React) {
    const PrimaryNav = require('./primary-nav.jsx')(React);

    return (props) => (
        <div className="container">
            <PrimaryNav primaryNav={props.primaryNav}/>
            { props.children }
        </div>
    );
}

module.exports = (React) => connect((state) => {
    return {
        primaryNav: state.get('primaryNav').toJS()
    };
})(wrap(React));
