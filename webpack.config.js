const
    path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanPlugin = require('clean-webpack-plugin'),
    AssetsPlugin = require('assets-webpack-plugin'),
    assetsPluginInstance = new AssetsPlugin(),
    projectRootPath = __dirname,
    assetsPath = path.join(__dirname, 'resources/js');

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
                test: /bootstrap-custom\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    ['css?sourceMap', 'sass?sourceMap']
                )
            },
            {
                test: /\.scss$/,
                exclude: /bootstrap-custom\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    [
                        'css?modules&sourceMap',
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
        new CleanPlugin([assetsPath], { root: projectRootPath }),
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
        new ExtractTextPlugin('[name]-[chunkhash].css'),
        assetsPluginInstance
    ],
    output: {
        path: assetsPath,
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/resources/js/'
    }
};
