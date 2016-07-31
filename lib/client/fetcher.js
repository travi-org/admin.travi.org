import {get} from 'xhr';

export function getResource(type, id) {
    return new Promise((resolve, reject) => {
        get(`/${type}/${id}`, (err, response) => {
            if (err) {
                reject(err);
            }

            resolve(response);
        });
    });
}

export function getResources(type) {
    return new Promise((resolve, reject) => {
        get(`/${type}`, (err, response) => {
            if (err) {
                reject(err);
            }

            resolve(response);
        });
    });
}
