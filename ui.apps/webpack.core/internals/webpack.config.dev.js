const path = require('path');
const CLIENTLIB_CONFIG = require('./clientlib.config.dev');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractCSS = new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
});
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OptimizeCss = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.bundle.css/g,
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
                            fix: true,
                            formatter: function (results) {
                                const output = require('eslint/lib/formatters/stylish')(
                                    results
                                );
                                console.log(output);

                                return '';
                            },
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
                                require('stylelint')({
                                    configFile: path.resolve(
                                        __dirname,
                                        './stylelint.config.js'
                                    ),
                                    fix: true,
                                }),
                                require('postcss-reporter'),
                                require('autoprefixer')()
                            ]
                        },
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
        filename: '[name].bundle.js',
    },
    plugins: [
        extractCSS,
        OptimizeCss,
        new AemClientlibGeneratorPlugin(CLIENTLIB_CONFIG),
    ],
    watchOptions: {
        ignored: [
            /node_modules/,
            '**/clientlibs-webpack-*/**',
            '**/*.bundle.css',
            '**/*.bundle.js',
        ],
    },
};

module.exports = merge(WEBPACK_CONFIG_COMMON, WEBPACK_CONFIG_DEV);
