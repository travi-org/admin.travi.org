const
    DEFAULT_STRING_LENGTH = 8,
    TLD_LENGTH = 3,
    HOST_LENGTH = 20;

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

    length = length || DEFAULT_STRING_LENGTH;
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
    return `${string()}.${string(HOST_LENGTH)}.${string(TLD_LENGTH)}`.toLowerCase();
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
    const list = [];
    let i, listSize = int();

    if (options && options.min) {
        listSize += options.min;
    }

    for (i = 0; i < listSize; i += 1) {
        list.push(constructor());
    }

    return list;
}

export default {
    string,
    int,
    float,
    url,
    simpleObject,
    listOf
};
