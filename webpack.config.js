'use strict';

const
    path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: ['./lib/client/app.jsx'],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: /lib\/(client|shared)/,
            loader: 'babel'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    output: {
        path: path.join(__dirname, 'resources/js'),
        filename: 'bundle.js'
    }
};
