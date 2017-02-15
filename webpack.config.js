/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import path from 'path';
import webpack from 'webpack';
import {getIfUtils, removeEmpty, combineLoaders} from 'webpack-config-utils';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin';

module.exports = (environment = 'production') => {
  const assetsPath = path.join(__dirname, 'resources/js');
  const devServerPort = '3000';
  const devServerHost = 'http://0.0.0.0';
  const {ifProduction, ifDevelopment} = getIfUtils(environment);

  process.env.BABEL_ENV = 'browser';

  return {
    devtool: 'source-map',
    entry: removeEmpty([
      ifDevelopment('react-hot-loader/patch'),
      ifDevelopment(`webpack-dev-server/client?${devServerHost}:${devServerPort}`),
      ifDevelopment('webpack/hot/only-dev-server'),
      './lib/client/app.js'
    ]),
    progress: false,
    module: {
      loaders: removeEmpty([
        {
          test: /\.jsx?$/,
          include: /lib\/(client|shared)/,
          loaders: removeEmpty([
            ifDevelopment('react-hot-loader/webpack'),
            ifDevelopment(
              'babel-loader?plugins[]=transform-react-jsx-source&cacheDirectory',
              'babel-loader?cacheDirectory'
            )
          ])
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=d+\.d+\.d+)?$/,
          loader: 'url-loader'
        },
        ifDevelopment({
          test: /bootstrap-custom\.scss$/,
          loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
        }),
        ifDevelopment({
          test: /\.scss$/,
          exclude: /bootstrap-custom\.scss$/,
          loaders: ['style-loader', 'css-loader?modules&sourceMap', 'sass-loader?sourceMap']
        }),
        ifProduction({
          test: /bootstrap-custom\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: combineLoaders([
              {
                loader: 'css-loader',
                query: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                query: {
                  sourceMap: true
                }
              }
            ])
          })
        }),
        ifProduction({
          test: /\.scss$/,
          exclude: /bootstrap-custom\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: combineLoaders([
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                query: {
                  outputStyle: 'compressed',
                  sourceMap: true,
                  sourceMapContents: true
                }
              }
            ])
          })
        })
      ])
    },
    plugins: removeEmpty([
      new CleanPlugin([assetsPath], {root: __dirname}),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(environment)
        }
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
        compress: {
          screw_ie8: true,
          warnings: false
        }
      })),
      ifProduction(new ExtractTextPlugin('[name]-[hash].css')),
      ifProduction(new Visualizer())
    ]),
    output: {
      path: assetsPath,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[hash].js',
      publicPath: '/resources/js/'
    }
  };
};
