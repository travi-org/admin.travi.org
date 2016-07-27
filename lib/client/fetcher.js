import {get} from 'xhr';

export function getResource({type, id}) {
    return new Promise((resolve, reject) => {
        get(`/${type}/${id}`, (err, response) => {
            if (err) {
                reject(err);
            }

            resolve(response);
        });
    });
}
