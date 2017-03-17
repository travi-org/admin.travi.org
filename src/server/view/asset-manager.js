import {readFile} from 'mz/fs';
import path from 'path';
import sort from './asset-sorter';

function mapToAssetLists(assets) {
  return Object.entries(assets)
    .map(([, files]) => files)
    .reduce(
      (acc, files) => ({
        js: [...acc.js, files.js],
        css: [...acc.css, files.css].filter(file => !!file)
      }),
      {js: [], css: []}
    );
}

function sortScriptsForProperWebpackLoadOrder(assets) {
  assets.js.sort(sort);

  return assets;
}

export default function () {
  return readFile(path.resolve(__dirname, '../../../webpack-assets.json'), 'utf-8')
    .then(fileContents => JSON.parse(fileContents))
    .then(assets => mapToAssetLists(assets))
    .then(assets => sortScriptsForProperWebpackLoadOrder(assets));
}
