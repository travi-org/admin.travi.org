'use strict';

const
    reactRedux = require('react-redux'),
    wrap = require('./wrap.jsx');

module.exports = (React) => reactRedux.connect((state) => {
    return {
        primaryNav: state.get('primaryNav').toJS()
    };
})(wrap(React));
