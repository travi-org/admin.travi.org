'use strict';

function float(max) {
    if (undefined === max || 0 > max) {
        max = 100;
    }

    return Math.random() * max;
}

function int(options) {
    const limits = options || {},

        integer = Math.floor(float(limits.max));

    if (limits.min) {
        return integer + limits.min;
    }

    return integer;
}

function string(length) {
    const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '',
        randomNumber,
        i;

    length = length || 8;
    for (i = 0; i < length; i += 1) {
        randomNumber = int({max: CHARS.length});
        randomString += CHARS.substring(randomNumber, randomNumber + 1);
    }

    return randomString;
}
function protocol() {
    const PROTOCOLS = ['http', 'https'];

    return `${PROTOCOLS[int({max: PROTOCOLS.length})]}://`;
}

function host() {
    return `${string()}.${string(20)}.${string(3)}`.toLowerCase();
}

function url(root) {
    const path = `/${string()}`;

    if (root) {
        return root + path;
    }

    return protocol() + host() + path;
}

function simpleObject() {
    return {
        [string()]: string()
    };
}

function listOf(constructor, options) {
    let i,
        listSize = int();
    const list = [];

    if (options && options.min) {
        listSize += options.min;
    }

    for (i = 0; i < listSize; i += 1) {
        list.push(constructor());
    }

    return list;
}

module.exports = {
    string,
    int,
    float,
    url,
    simpleObject,
    listOf
};
