const path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss?$/,
                loader: 'style!css!sass?' + JSON.stringify({
                    includePaths: [ path.resolve(__dirname, '../bower_components') ],
                    sourceMap : true
                })
            }
        ]
    }
};