import {assert} from 'chai';
import sinon from 'sinon';
import {simpleObject} from '@travi/any';
import fs from 'fs';
import path from 'path';
import getAssets from '../../../../lib/server/view/asset-manager';

suite('asset manager', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(fs, 'readFile');
  });

  teardown(() => sandbox.restore());

  test('that the asset list is returned based on the webpack assets file', () => {
    const assets = simpleObject();
    fs.readFile.withArgs(path.resolve(__dirname, '../../../../webpack-assets.json'), 'utf-8').yields(null, assets);

    return assert.becomes(getAssets(), assets);
  });

  test('that an error loading the assets file results in rejection', () => {
    const msg = 'from test';
    const error = new Error(msg);
    fs.readFile.yields(error);

    return assert.isRejected(getAssets(), error, msg);
  });
});
