'use strict';

function float(max) {
    if (undefined === max || 0 > max) {
        max = 100;
    }

    return Math.random() * max;
}

function int(max) {
    return Math.floor(float(max));
}

function string(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        randomString = '',
        randomNumber,
        i;

    length = length || 8;
    for (i = 0; i < length; i += 1) {
        randomNumber = int(chars.length);
        randomString += chars.substring(randomNumber, randomNumber + 1);
    }

    return randomString;
}
function protocol() {
    var protocols = ['http', 'https'];

    return protocols[int(protocols.length)] + '://';
}

function host() {
    return string() + '.' + string(20) + '.' + string(3);
}

function url() {
    return protocol() + host() + '/' + string();
}

function listOf(constructor) {
    var list = [],
        listSize = int(),
        i;

    for (i = 0; i < listSize; i += 1) {
        list.push(constructor());
    }

    return list;
}

module.exports = {
    string: string,
    int: int,
    url: url,
    listOf: listOf
};
