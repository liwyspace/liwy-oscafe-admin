const webpack = require('webpack');
const path = require('path');
const config = require('../config');
const prodWebpackConfig = require('./webpack.prod.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('./utils');

prodWebpackConfig.entry = {
    portalSDK: './src/main-sdk.js'
};

prodWebpackConfig.output.filename = utils.assetsPath('js/[name].js');
// prodWebpackConfig.output.library = 'PortalSDK';
// prodWebpackConfig.output.libraryTarget = 'umd';

prodWebpackConfig.externals = {};
prodWebpackConfig.module.rules.push({ // 通过expose-loader将jquery暴露到全局变量中
    test: require.resolve('jquery'),
    use: [{
        loader: 'expose-loader',
        options: 'jQuery'
    }, {
        loader: 'expose-loader',
        options: '$'
    }]
});

prodWebpackConfig.plugins = [
    new CleanWebpackPlugin(config.build.assetsRoot, {
        root: path.resolve(__dirname, '../'), // 设置root
        verbose: true
    }),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
        'process.env': require('../config/prod.env')
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: true
    }),
    new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].css')
    })
];

module.exports = prodWebpackConfig;
