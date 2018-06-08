import * as container from '@travi/ioc';
import {assert} from 'chai';
import sinon from 'sinon';
import {define} from '../../../../src/server/dependencies';
import * as fetcher from '../../../../src/server/resources/fetcher';

suite('server dependencies', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(container, 'register');
  });

  teardown(() => {
    sandbox.restore();
  });

  test('that the dependencies are loaded into the container', () => {
    define();

    assert.calledWith(container.register, 'fetcher-factory', fetcher);
  });
});
