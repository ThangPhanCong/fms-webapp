const webpack = require('webpack');
const path = require('path');

let configPath;

const indexHtml = path.join(__dirname, 'app', 'index.html');

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    // Disabled because of an issue with Uglify breaking seemingly valid code:
    // https://github.com/facebookincubator/create-react-app/issues/2376
    // Pending further investigation:
    // https://github.com/mishoo/UglifyJS2/issues/2011
    comparisons: false,
  },
  output: {
    comments: false,
    // Turned on because emoji and regex is not minified properly using default
    // https://github.com/facebookincubator/create-react-app/issues/2488
    ascii_only: true,
  },
  sourceMap: false
})

let plugins = [
  new webpack.ProvidePlugin({
    '$': 'jquery',
    'jQuery': 'jquery'
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
    minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
  }),
];

if (process.env.NODE_ENV === 'production') {
  configPath = 'config-prod.json';
  plugins.push(uglifyJs);
} else {
  configPath = 'config.json';
}

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
      bootstrapJs: 'bootstrap/dist/js/bootstrap.min.js',
      'CONFIG': configPath
    },
    extensions: ['', '.json', '.js', '.jsx']
  },

  plugins: plugins,

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
        loaders: ['file-loader?name=\/[name].css', 'extract-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.css$/,
        loaders: ['file-loader?name=\/[name].[ext]', 'extract-loader', 'css-loader'],
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
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?name=[name].[ext]'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  devtool: 'cheap-module-eval-source-map'
};
