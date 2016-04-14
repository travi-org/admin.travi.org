const path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss?$/,
                loader: 'style!css!sass?' + JSON.stringify({
                    includePaths: [ path.resolve(__dirname, '../node_modules/@travi') ],
                    sourceMap : true
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=d+\.d+\.d+)?$/,
                loader: 'url'
            }
        ]
    }
};