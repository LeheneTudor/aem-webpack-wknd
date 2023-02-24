const path = require('path');
const CLIENTLIB_CONFIG = require('./clientlib.config.prod');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AemClientlibGeneratorPlugin = require('aem-clientlib-generator-webpack-plugin');
const WEBPACK_CONFIG_COMMON = require('./webpack.config.common');
const { merge } = require('webpack-merge');

const WEBPACK_CONFIG_DEVENV = {
    name: 'base',
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: require('./babel.config.js'),
                    },
                    {
                        loader: 'eslint-loader',
                        query: {
                            configFile: path.resolve(
                                __dirname,
                                './eslint.config.js'
                            ),
                            fix: false,
                        },
                    },
                ],
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require("sass")
                        }
                    },
                ],
            },
        ],
    },
    output: {
        filename: '[name].[contenthash:8].bundle.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].bundle.css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new AemClientlibGeneratorPlugin(CLIENTLIB_CONFIG),
    ],
    watchOptions: {
        ignored: [
            /node_modules/,
            '**/*.bundle.css',
            '**/*.bundle.js',
            '**/*.html',
            '**/*.xml',
        ],
    },
};

module.exports = merge(WEBPACK_CONFIG_COMMON, WEBPACK_CONFIG_DEVENV);
