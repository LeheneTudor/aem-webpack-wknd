const path = require('path');
const CLIENTLIB_CONFIG_PROD = require('./clientlib.config.prod');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AemClientlibGeneratorPlugin = require('aem-clientlib-generator-webpack-plugin');
const WEBPACK_CONFIG_COMMON = require('./webpack.config.common');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const WEBPACK_CONFIG_PROD = {
    name: 'prod',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
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
        new AemClientlibGeneratorPlugin(CLIENTLIB_CONFIG_PROD),
    ],
    optimization: {
        minimizer: [
            `...`,  // Include default minimizers
            new CssMinimizerPlugin(),
        ],
    }
};

module.exports = merge(WEBPACK_CONFIG_COMMON, WEBPACK_CONFIG_PROD);
