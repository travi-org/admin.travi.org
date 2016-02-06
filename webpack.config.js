'use strict';

const path = require('path');

module.exports = {
    entry: ['./lib/client/app.jsx'],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    },
    output: {
        path: path.join(__dirname, 'resources/js'),
        filename: 'bundle.js'
    }
};
