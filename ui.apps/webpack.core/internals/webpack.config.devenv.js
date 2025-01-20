const path = require('path');
const CLIENTLIB_CONFIG = require('./clientlib.config.prod');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
                use: [],
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
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')(),
                                    require('cssnano')({
                                        preset: 'default',
                                    }),
                                ],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,  // Optional: enable source maps for easier debugging
                        },
                    }
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
