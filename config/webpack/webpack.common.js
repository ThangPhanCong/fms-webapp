const webpack = require('webpack');
const path = require('path');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __rootdir = path.join(__dirname, '/../..');
let configPath;

const indexHtml = path.join(__rootdir, 'app', 'index.html');
const indextestHtml = path.join(__rootdir, 'app', 'index-test.html');
const appJs = path.join(__rootdir, 'app', 'index.js');
const apptestJs = path.join(__rootdir, 'app', 'index-test.js');

const entry = {
    app: appJs
};

let plugins = [
    new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js',
        minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
    new SuppressChunksPlugin(['index-test', 'indexHtml']),
    new webpack.optimize.ModuleConcatenationPlugin()
];


if (process.env.NODE_ENV === 'production') {
    configPath = path.resolve(__rootdir, 'config/env/config-prod.json');
} else if (process.env.NODE_ENV === 'staging') {
    configPath = path.resolve(__rootdir, 'config/env/config-staging.json');
} else {
    configPath = path.resolve(__rootdir, 'config.json');
    entry['index-test'] = indextestHtml;
    entry['app-test'] = apptestJs;
    plugins = [...plugins, new BundleAnalyzerPlugin(),
    ]
}

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__rootdir, 'build'),
        filename: '[name].[chunkhash].bundle.js',
        publicPath: '/'
    },

    resolve: {
        alias: {
            CONFIG: configPath,
            images: path.resolve(__rootdir, 'app/assets/images'),
            commons: path.resolve(__rootdir, 'app/commons'),
            api: path.resolve(__rootdir, 'app/api'),
            helpers: path.resolve(__rootdir, 'app/helpers'),
            utils: path.resolve(__rootdir, 'app/utils')
        },
        extensions: ['.json', '.js', '.jsx']
    },

    plugins: plugins,

    module: {
        rules: [
            {
                test: [indextestHtml],
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
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            data: '@import "bootstrap/variables"; @import "bootstrap/mixins";',
                            includePaths: [
                                path.join(__rootdir, 'app/assets/styles')
                            ]
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                loaders: [
                    'style-loader', 'css-loader'
                ],
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ["env", {
                            "targets": {
                                "browsers": ["last 2 versions"]
                            },
                            "useBuiltIns": "entry",
                        }],
                        'react',
                        'stage-0'
                    ],
                    // compact: false,
                }
            }, {
                test: /\.(ttf|eot|woff|woff2|svg|png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: '10000'
                }
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
