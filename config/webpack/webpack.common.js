const webpack = require('webpack');
const path = require('path');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;

const __rootdir = path.join(__dirname, '/../..');
let configPath;

const indexHtml = path.join(__rootdir, 'app', 'index.html');
const indextestHtml = path.join(__rootdir, 'app', 'index-test.html');
const appJs = path.join(__rootdir, 'app', 'index.js');
const apptestJs = path.join(__rootdir, 'app', 'index-test.js');

const entry = {
    indexHtml,
    app: appJs
};

if (process.env.NODE_ENV === 'production') {
    configPath = path.resolve(__rootdir, 'config/env/config-prod.json');
} else if (process.env.NODE_ENV === 'staging') {
    configPath = path.resolve(__rootdir, 'config/env/config-staging.json');
} else {
    configPath = path.resolve(__rootdir, 'config.json');
    entry['index-test'] = indextestHtml;
    entry['app-test'] = apptestJs;
}

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__rootdir, 'build'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },

    resolve: {
        alias: {
            bootstrapJs: path.resolve(__rootdir, 'node_modules/bootstrap/dist/js/bootstrap.min.js'),
            CONFIG: configPath,
            images: path.resolve(__rootdir, 'app/images')
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
        }),
        new SuppressChunksPlugin(['index-test', 'indexHtml'])
    ],

    module: {
        rules: [
            {
                test: [indexHtml, indextestHtml],
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
                        loader: "sass-loader", options: {
                            sourceMap: false,
                            data: '@import "variables";',
                            includePaths: [
                                path.join(__rootdir, 'app/styles/theme')
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
                    presets: ['react', 'es2015', 'stage-0'],
                    compact: false,
                },
                exclude: /(node_modules)/
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
