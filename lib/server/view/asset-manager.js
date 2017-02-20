import {readFile} from 'fs';
import path from 'path';

export default function () {
  return new Promise((resolve, reject) => {
    readFile(path.resolve(__dirname, '../../../webpack-assets.json'), 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  }).then(assets => Object.entries(assets)
    .map(([, files]) => files)
    .reduce(
      (acc, files) => ({
        js: [...acc.js, files.js],
        css: [...acc.css, files.css]
      }),
      {js: [], css: []}
    )
  );
}
