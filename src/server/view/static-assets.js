/* eslint import/prefer-default-export: 'off' */
export const plugin = {
  name: 'static-assets',
  async register(server) {
    let handler;

    if ('development' === process.env.NODE_ENV) {
      handler = {
        proxy: {
          host: '0.0.0.0',
          port: 3000,
          passThrough: true
        }
      };
    } else {
      handler = {directory: {path: 'resources'}};
    }

    server.route({
      method: 'GET',
      path: '/resources/{param*}',
      handler
    });

    server.route({
      method: 'GET',
      path: '/favicon.ico',
      handler: {
        file: {
          path: 'node_modules/@travi/travi.org-theme/img/favicon.ico'
        }
      }
    });
  }
};
