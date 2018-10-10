const webpack = require('webpack');
const path = require('path');
const config = require('../config');
const prodWebpackConfig = require('./webpack.prod.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('./utils');

prodWebpackConfig.entry = {
    portalSDK: './src/main.js'
};

prodWebpackConfig.output.filename = utils.assetsPath('js/[name].js');
prodWebpackConfig.output.library = 'PortalSDK';
prodWebpackConfig.output.libraryTarget = 'umd';

prodWebpackConfig.externals = {};

prodWebpackConfig.plugins = [
    new CleanWebpackPlugin(config.build.assetsRoot, {
        root: path.resolve(__dirname, '../'), // 设置root
        verbose: true
    }),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
        'process.env': require('../config/prod.env')
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
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
