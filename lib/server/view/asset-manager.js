import {readFile} from 'fs';
import path from 'path';

export default function () {
  return new Promise((resolve, reject) => {
    readFile(path.resolve(__dirname, '../../../webpack-assets.json'), (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
