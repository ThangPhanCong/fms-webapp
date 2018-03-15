const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('local')
            }
        }),

        new BundleAnalyzerPlugin()
    ]
});
