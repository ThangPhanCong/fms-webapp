const webpack = require('webpack');
const path = require('path');

let configPath;

const indexHtml = path.join(__dirname, 'app', 'index.html');
const appJs = path.join(__dirname, 'app', 'app.jsx');

if (process.env.NODE_ENV === 'production') {
  configPath = path.resolve(__dirname, 'config-prod.json');
} else {
  configPath = path.resolve(__dirname, 'config.json');
}

module.exports = {
  entry: [
    appJs,
    indexHtml
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },

  resolve: {
    modules: [
      'node_modules',
      'app',
      'app/api',
      'app/pages',
      'app/images',
      'app/socket',
      'app/pages/home',
      'app/components',
      'app/pages/pages',
      'app/pages/login',
      'app/pages/posts',
      'app/pages/project',
      'app/pages/settings',
      'app/pages/dashboard',
      'app/pages/dashboard/client-info',
      'app/pages/dashboard/client-list',
      'app/pages/dashboard/conversation-area'
    ],
    alias: {
      bootstrapJs: path.resolve(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.min.js'),
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
        options: {
          presets: ['react', 'es2015', 'stage-0'],
          // compact: true,
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
