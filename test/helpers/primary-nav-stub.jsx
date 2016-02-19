'use strict';

module.exports = (React) => (props) => (
    <span id="primary-nav">
        <ul id="nav-items">
            {props.primaryNav.map((type) => {
                return <li key={type}/>;
            })}
        </ul>
    </span>
);
