const path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss?$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, '../bower_components/'),
            path.resolve(__dirname, '../resources/sass/')
        ]
    }
};