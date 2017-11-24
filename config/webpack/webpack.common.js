const webpack = require('webpack');
const path = require('path');

const __rootdir = path.join(__dirname, '/../..');
let configPath;

const indexHtml = path.join(__rootdir, 'app', 'index.html');
const appJs = path.join(__rootdir, 'app', 'index.js');

if (process.env.NODE_ENV === 'production') {
  configPath = path.resolve(__rootdir, 'config/env/config-prod.json');
} else if (process.env.NODE_ENV === 'staging') {
  configPath = path.resolve(__rootdir, 'config/env/config-staging.json');
} else {
  configPath = path.resolve(__rootdir, 'config.json');
}

module.exports = {
  entry: [
    appJs,
    indexHtml
  ],

  output: {
    path: path.resolve(__rootdir, 'build'),
    filename: 'app.bundle.js'
  },

  resolve: {
    alias: {
      bootstrapJs: path.resolve(__rootdir, 'node_modules/bootstrap/dist/js/bootstrap.min.js'),
      CONFIG: configPath
    },
    extensions: ['.json', '.js', '.jsx']
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
    })
  ],

  module: {
    rules: [
      {
        test: indexHtml,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              attrs: ["img:src", "link:href"]
            }
          }
        ],
      }, {
        test: /\.scss$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '/static/[name].css'
            }
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV == 'production'
            }
          },
          'sass-loader'
        ],
      }, {
        test: /\.css$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '/static/[name].css'
            }
          },
          'extract-loader', 'css-loader'
        ],
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['react', 'es2015', 'stage-0'],
          compact: false,
        },
        exclude: /(node_modules)/
      }, {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: 'url-loader',
        options: {
          limit: '5000',
          name: '/static/[name].[ext]'
        }
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          name : '/static/[name].[ext]'
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
