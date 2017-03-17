import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import fs from 'mz/fs';
import path from 'path';
import getAssets from '../../../../src/server/view/asset-manager';

suite('asset manager', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(fs, 'readFile');
  });

  teardown(() => sandbox.restore());

  test('that the asset list is returned based on the webpack assets file', () => {
    const assetsFile = any.listOf(() => ({[any.word()]: {
      js: any.word(),
      css: any.fromList([any.word(), undefined, undefined])
    }})).reduce((acc, entry) => ({...acc, ...entry}), {});
    const assetsByEntry = Object.values(assetsFile);
    const jsFiles = assetsByEntry.map(files => files.js);
    const cssFiles = assetsByEntry.map(files => files.css).filter(file => !!file);
    fs.readFile
      .withArgs(path.resolve(__dirname, '../../../../webpack-assets.json'), 'utf-8')
      .resolves(JSON.stringify(assetsFile));

    return getAssets().then(assets => {
      jsFiles.forEach(file => assert.include(assets.js, file));
      assert.equal(assets.css.length, cssFiles.length);
      cssFiles.forEach(file => assert.include(assets.css, file));
    });
  });

  test('that an error loading the assets file results in rejection', () => {
    const msg = 'from test';
    const error = new Error(msg);
    fs.readFile.rejects(error);

    return assert.isRejected(getAssets(), error, msg);
  });
});
