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

function getResourceTypes(callback) {
    requestDataFrom('/', callback);
}

export { getResourceTypes };
