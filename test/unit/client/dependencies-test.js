import * as container from '@travi/ioc';
import {assert} from 'chai';
import sinon from 'sinon';
import configure from '../../../src/client/dependencies';
import * as fetcher from '../../../src/client/fetcher';

suite('client dependencies', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(container, 'register');
  });

  teardown(() => {
    sandbox.restore();
  });

  test('that the dependencies are loaded into the container', () => {
    configure();

    assert.calledWith(container.register, 'fetcher-factory', fetcher);
  });
});
