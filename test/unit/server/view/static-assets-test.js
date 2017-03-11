import {assert} from 'chai';
import sinon from 'sinon';
import {register} from '../../../../src/server/view/static-assets';

suite('static assets', () => {
  teardown(() => {
    process.env.NODE_PATH = null;
  });

  test('that the plugin is defined', () => {
    assert.deepEqual(register.attributes, {
      name: 'static-assets'
    });
  });

  test('that the static asset routes are configured', () => {
    const next = sinon.spy();
    const route = sinon.spy();

    register({route}, null, next);

    assert.calledOnce(next);
    assert.calledWith(route, {
      method: 'GET',
      path: '/resources/{param*}',
      handler: {
        directory: {
          path: 'resources'
        }
      }
    });
    assert.calledWith(route, {
      method: 'GET',
      path: '/favicon.ico',
      handler: {
        file: {
          path: 'node_modules/@travi/travi.org-theme/img/favicon.ico'
        }
      }
    });
  });

  test('that requests for assets are proxied in development', () => {
    const next = sinon.spy();
    const route = sinon.spy();
    process.env.NODE_ENV = 'development';

    register({route}, null, next);

    assert.calledWith(route, {
      method: 'GET',
      path: '/resources/{param*}',
      handler: {
        proxy: {
          host: '0.0.0.0',
          port: 3000,
          passThrough: true
        }
      }
    });
  });
});
