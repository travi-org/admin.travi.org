'use strict';

const
    reactRedux = require('react-redux'),
    resource = require('./user.jsx');

module.exports = (React) => reactRedux.connect((state) => {
    const user = state.get('resource').toJS();
    return {
        user: {
            id: user.id,
            displayName: user.displayName,
            links: user.links,
            avatar: user.thumbnail
        }
    };
})(resource(React));
