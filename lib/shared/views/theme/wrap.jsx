'use strict';

module.exports = (React) => {
    const PrimaryNav = require('./primary-nav.jsx')(React);

    function Wrap(props) {
        return (
            <div className="container">
                <PrimaryNav primaryNav={props.primaryNav}/>
                { props.children }
            </div>
        );
    }
    Wrap.displayName = 'Wrap';

    return Wrap;
};
