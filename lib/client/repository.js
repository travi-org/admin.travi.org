const xhr = require('xhr');

function requestDataFrom(url, callback) {
    xhr({url: url}, (err, response) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(response.body));
        }
    });
}

function getResource(type, id, callback) {
    requestDataFrom(`/${type}/${id}`, callback);
}

function getResources(type, callback) {
    requestDataFrom(`/${type}`, callback);
}

function getResourceTypes(callback) {
    requestDataFrom(`/`, callback);
}

module.exports = {
    getResource,
    getResources,
    getResourceTypes
};
