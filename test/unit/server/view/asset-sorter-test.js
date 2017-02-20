import any from '@travi/any';
import {assert} from 'chai';
import sort from '../../../../lib/server/view/asset-sorter';

suite('sort webpack assets', () => {
  const manifest = `/assets/manifest-${any.string()}.js`;
  const vendor = `/assets/vendor-${any.string()}.js`;

  test('that the second value should be placed before the first if the second is the manifest chunk', () => {
    assert.equal(sort(any.string(), manifest), 1);
  });

  test('that the first value should be placed before the second if the first is the manifest chunk', () => {
    assert.equal(sort(manifest, any.string()), -1);
  });

  test('that manifest is sorted before vendor if the first is the manifest and the second is the vendor', () => {
    assert.equal(sort(manifest, vendor), -1);
  });

  test('that manifest is sorted before vendor if the first is the vendor and the second is the manifest', () => {
    assert.equal(sort(vendor, manifest), 1);
  });

  test('that the second value should be placed before the first if the second is the vendor chunk', () => {
    assert.equal(sort(any.string(), vendor), 1);
  });

  test('that the first value should be placed before the second if the first is the vendor chunk', () => {
    assert.equal(sort(vendor, any.string()), -1);
  });

  test('that two values that are neither the vendor chunk, nor the manifest chunk are left unchanged', () => {
    assert.equal(sort(any.string(), any.string()), 0);
  });
});
