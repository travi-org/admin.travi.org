'use strict';

module.exports = (React) => {
    const PrimaryNav = require('./primary-nav.jsx')(React);

    return (props) => (
        <div className="container">
            <PrimaryNav primaryNav={props.primaryNav}/>
            { props.children }
        </div>
    );
};
