'use strict';

function init() {
    const
        director = require('director'),
        router = new director.Router();

    router.init();
}

module.exports = { init };
