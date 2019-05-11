/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import path from 'path';
import webpack from 'webpack';
import {getIfUtils, removeEmpty} from 'webpack-config-utils';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

export default function (env) {
  const assetsPath = path.join(__dirname, 'resources/js');
  const devServerPort = '3000';
  const devServerHost = 'http://0.0.0.0';
  const {ifProduction, ifDevelopment} = getIfUtils(env);

  return {
    devtool: ifDevelopment('eval-source-map', 'source-map'),
    context: path.resolve(__dirname),
    entry: {
      vendor: ['react', 'react-dom'],
      main: removeEmpty([
        ifDevelopment('react-hot-loader/patch'),
        ifDevelopment(`webpack-dev-server/client?${devServerHost}:${devServerPort}`),
        ifDevelopment('webpack/hot/only-dev-server'),
        './src/client/app.js'
      ])
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.js$/,
          include: /@travi/,
          enforce: 'pre',
          loader: 'source-map-loader'
        },
        {
          test: /\.js$/,
          include: /src\/(client|shared)/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            comments: false,
            babelrc: false,
            presets: [['travi', {react: true, targets: {browser: true}, modules: false}]],
            plugins: removeEmpty([
              ifProduction('transform-react-remove-prop-types'),
              ifDevelopment('react-hot-loader/babel'),
              ifDevelopment('transform-react-jsx-source'),
              'transform-runtime',
              'lodash'
            ])
          }
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=d+\.d+\.d+)?$/,
          loader: 'url-loader'
        },
        ifDevelopment({
          test: /bootstrap-custom\.scss$/,
          loaders: [
            'style-loader',
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        }),
        ifDevelopment({
          test: /\.scss$/,
          exclude: /bootstrap-custom\.scss$/,
          loaders: [
            'style-loader',
            {loader: 'css-loader', options: {modules: true, sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        }),
        ifProduction({
          test: /bootstrap-custom\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader', options: {sourceMap: true}},
              {loader: 'sass-loader', options: {sourceMap: true}}
            ]
          })
        }),
        ifProduction({
          test: /\.scss$/,
          exclude: /bootstrap-custom\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'compressed',
                  sourceMap: true,
                  sourceMapContents: true
                }
              }
            ]
          })
        })
      ])
    },
    resolve: {
      symlinks: false,
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
    plugins: removeEmpty([
      new CleanPlugin([assetsPath], {root: __dirname}),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env)
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new AssetsPlugin(),
      ifDevelopment(new webpack.HotModuleReplacementPlugin()),
      ifDevelopment(new webpack.NamedModulesPlugin()),
      ifProduction(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })),
      ifProduction(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false
        }
      })),
      ifProduction(new ExtractTextPlugin('[name]-[contenthash].css')),
      ifProduction(new Visualizer()),
      ifProduction(new BundleAnalyzerPlugin({generateStatsFile: true, analyzerMode: 'static', openAnalyzer: false}))
    ]),
    output: {
      path: assetsPath,
      filename: ifProduction('[name]-[chunkhash].js', '[name].js'),
      chunkFilename: ifProduction('[name]-[chunkhash].js', '[name].js'),
      publicPath: '/resources/js/'
    }
  };
}
