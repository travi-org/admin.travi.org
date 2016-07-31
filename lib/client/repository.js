import xhr from 'xhr';

function requestDataFrom(url, callback) {
    xhr({url}, (err, response) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(response.body));
        }
    });
}

function getResources(type, callback) {
    requestDataFrom(`/${type}`, callback);
}

function getResourceTypes(callback) {
    requestDataFrom('/', callback);
}

export {
    getResources,
    getResourceTypes
};
