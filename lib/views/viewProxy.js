'use strict';

var VIEWS_ROOT = './',
    EXTENSION = '.jsx';

function getComponent(name) {
    return require(VIEWS_ROOT + name + EXTENSION);
}

module.exports = {
    getComponent: getComponent
};
