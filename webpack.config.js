let webpack = require('webpack');
let path = require('path');

const indexHtml = path.join(__dirname, 'app', 'index.html');

module.exports = {
  entry: [
    'app/app.jsx',
    indexHtml
  ],
  output: {
    path: path.resolve(__dirname, './build/'),
    filename: 'app.bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      'app',
      'app/api',
      'app/pages',
      'app/images',
      'app/socket',
      'app/components',
      'app/pages/pages',
      'app/pages/posts',
      'app/pages/dashboard'
    ],
    alias: {
      bootstrapJs: 'bootstrap/dist/js/bootstrap.min.js'
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
  ],
  module: {
    loaders: [
      {
        test: indexHtml,
        loaders: [
          'file-loader?name=[name].[ext]',
          'extract-loader',
          'html-loader?' + JSON.stringify({attrs: ["img:src", "link:href"]})
        ],
      }, {
        test: /\.scss$/,
        loaders: ['file-loader?name=[name].css', 'extract-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.css$/,
        loaders: ['file-loader?name=[name].[ext]', 'extract-loader', 'css-loader'],
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        exclude: /(node_modules)/
      }, {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: 'url-loader',
        query: {
          limit: '5000',
          name: '[name].[ext]'
        }
      }
    ]
  },
  // devtool: 'cheap-module-eval-source-map'
};
