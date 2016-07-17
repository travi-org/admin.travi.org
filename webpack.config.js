/* eslint-disable camelcase */
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import validate from 'webpack-validator';

function buildLoadersList(environment) {
    const loaders = [
        {
            test: /\.jsx?$/,
            include: /lib\/(client|shared)/,
            loader: 'babel'
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=d+\.d+\.d+)?$/,
            loader: 'url'
        }
    ];

    if ('development' === environment) {
        loaders.push({
            test: /bootstrap-custom\.scss$/,
            loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
        });
        loaders.push({
            test: /\.scss$/,
            exclude: /bootstrap-custom\.scss$/,
            loaders: ['style', 'css?modules&sourceMap', 'sass?sourceMap']
        });
    }

    if ('production' === environment) {
        loaders.push({
            test: /bootstrap-custom\.scss$/,
            loader: ExtractTextPlugin.extract(
                'style',
                ['css?sourceMap', 'sass?sourceMap']
            )
        });
        loaders.push({
            test: /\.scss$/,
            exclude: /bootstrap-custom\.scss$/,
            loader: ExtractTextPlugin.extract(
                'style',
                [
                    'css?modules&sourceMap',
                    'sass?outputStyle=compressed&sourceMap=true&sourceMapContents=true'
                ]
            )
        });
    }

    return loaders;
}

function buildPluginsList(assetsPath, environment) {
    const plugins = [
        new CleanPlugin([assetsPath], {root: __dirname}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(environment)
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new AssetsPlugin()
    ];

    if ('development' === environment) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    if ('production' === environment) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            }
        }));
        plugins.push(new webpack.optimize.DedupePlugin());
        plugins.push(new ExtractTextPlugin('[name]-[hash].css'));
    }

    return plugins;
}

function buildEntryPointList(environment, devServerHost, devServerPort) {
    const entryPoints = ['./lib/client/app.js'];

    if ('development' === environment) {
        entryPoints.push(`webpack-dev-server/client?${devServerHost}:${devServerPort}`);
        entryPoints.push('webpack/hot/only-dev-server');
    }

    return entryPoints;
}

function buildConfig(environment) {
    const
        assetsPath = path.join(__dirname, 'resources/js'),
        devServerPort = '3000',
        devServerHost = 'http://0.0.0.0',
        config = {
            devtool: 'source-map',
            entry: buildEntryPointList(environment, devServerHost, devServerPort),
            progress: false,
            module: {loaders: buildLoadersList(environment)},
            plugins: buildPluginsList(assetsPath, environment),
            output: {
                path: assetsPath,
                filename: '[name]-[hash].js',
                chunkFilename: '[name]-[hash].js',
                publicPath: '/resources/js/'
            }
        };

    if ('development' === environment) {
        config.devServer = {
            inline: true,
            contentBase: assetsPath,
            port: devServerPort
        };
        config.output.publicPath = `${devServerHost}:${devServerPort}/resources/js/`;
    }

    return config;
}

module.exports = function (environment = 'production') {
    return validate(buildConfig(environment));
};
