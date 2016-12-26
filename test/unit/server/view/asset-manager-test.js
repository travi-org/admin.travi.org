import proxyquire from 'proxyquire';
import {assert} from 'chai';
import {simpleObject} from '@travi/any';
import sinon from 'sinon';

const assets = simpleObject();
const assetManager = proxyquire('../../../../lib/server/view/asset-manager', {
  '../../../webpack-assets.json': assets
});

suite('asset manager', () => {
  test('that the asset list is returned based on the webpack assets file', () => {
    const callback = sinon.spy();

    assetManager.default(callback);

    assert.calledWith(callback, null, assets);
  });
});
