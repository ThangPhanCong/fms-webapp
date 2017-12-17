const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const devConfig = {
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    })
  ]
}
module.exports = [
  merge(common.sourceApp, devConfig),
  merge(common.sourceTestApp, devConfig)
]
