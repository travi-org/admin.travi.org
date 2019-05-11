/* eslint import/prefer-default-export: 'off' */
import {get} from 'xhr';

export function createFetcher() {
  return {
    getResource(type, id) {
      return new Promise((resolve, reject) => {
        get(`/${type}/${id}`, (err, response) => {
          if (err) {
            reject(err);
          }

          resolve(JSON.parse(response.body).resource);
        });
      });
    },
    getResources(type) {
      return new Promise((resolve, reject) => {
        get(`/${type}`, (err, response) => {
          if (err) {
            reject(err);
          }

          resolve(JSON.parse(response.body)[type]);
        });
      });
    },
    getNav() {
      return new Promise((resolve, reject) => {
        get('/', (err, response) => {
          if (err) {
            reject(err);
          }

          resolve(JSON.parse(response.body).primaryNav);
        });
      });
    }
  };
}
