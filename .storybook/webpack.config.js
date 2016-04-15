const path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss?$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=d+\.d+\.d+)?$/,
                loader: 'url'
            }
        ]
    }
};