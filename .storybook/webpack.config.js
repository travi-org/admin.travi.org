module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss?$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=d+\.d+\.d+)?$/,
                loader: 'url'
            }
        ]
    }
};
