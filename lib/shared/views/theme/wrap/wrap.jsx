'use strict';

module.exports = (React) => {
    const PrimaryNav = require('./../primary-nav.jsx')(React);

    function Wrap({primaryNav, children}) {
        return (
            <div className="container">
                <PrimaryNav primaryNav={primaryNav}/>
                { children }
            </div>
        );
    }
    Wrap.displayName = 'Wrap';

    return Wrap;
};
