const path = require('path');
const CLIENTLIB_CONFIG = require('./clientlib.config.dev');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractCSS = new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
});
const AemClientlibGeneratorPlugin = require('aem-clientlib-generator-webpack-plugin');
const WEBPACK_CONFIG_COMMON = require('./webpack.config.common');
const { merge } = require('webpack-merge');

const WEBPACK_CONFIG_DEV = {
    name: 'dev',
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
        filename: '[name].bundle.js',
    },
    plugins: [
        extractCSS,
        new AemClientlibGeneratorPlugin(CLIENTLIB_CONFIG),
    ],
    watchOptions: {
        ignored: [
            '**/node_modules/**',
            '**/clientlibs-webpack-*/**',
            '**/*.bundle.css',
            '**/*.bundle.js',
        ],
    },
};

module.exports = merge(WEBPACK_CONFIG_COMMON, WEBPACK_CONFIG_DEV);
