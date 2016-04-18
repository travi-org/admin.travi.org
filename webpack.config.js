const
    path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: ['./lib/client/app.jsx'],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: /lib\/(client|shared)/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    [
                        'css?sourceMap',
                        'sass?outputStyle=compressed&sourceMap=true&sourceMapContents=true'
                    ]
                )
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=d+\.d+\.d+)?$/,
                loader: 'url'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles.css')
    ],
    output: {
        path: path.join(__dirname, 'resources/js'),
        filename: 'bundle.js'
    }
};
