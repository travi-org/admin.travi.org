/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getConfigFor from './webpack.config.babel';

if ('development' !== process.env.NODE_ENV) {
  throw new Error('ERROR: Webpack dev server only works in dev environment');
}

const port = 3000;
const host = '0.0.0.0';
const config = getConfigFor('development');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  // quiet:true,
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  stats: {colors: true}
}).listen(port, host, err => {
  if (err) console.error(err);                                                    // eslint-disable-line no-console

  console.info('webpack-dev-server listening at http://%s:%s', host, port);       // eslint-disable-line no-console
});
