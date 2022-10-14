const path = require('path');
const CONFIG = require('../../webpack.project');
const CLIENTLIB_CONFIG = require('./clientlib.config.prod');
const NODE_MODULES = path.join(__dirname, '../node_modules');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AemClientlibGeneratorPlugin = require('aem-clientlib-generator-webpack-plugin');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

const WEBPACK_CONFIG_BASE = {
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
            {
                test: /.(jpg|jpeg|png|mp3|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    output: {
        filename: '[name].[contenthash:8].bundle.js',
        library: CONFIG.aem.libraryName.replace(/[\s-]/, '_'),
        publicPath:
            '/etc.clientlibs/' +
            CONFIG.aem.projectFolderName +
            '/clientlibs/webpack.bundles/resources/',
        path:
            CONFIG.aem.outputJcrRoot +
            '/apps/' +
            CONFIG.aem.projectFolderName +
            '/clientlibs/webpack.bundles/resources',
    },
    plugins: [
        new CleanWebpackPlugin({
            dry: false,
            dangerouslyAllowCleanPatternsOutsideProject: true,
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                path.join(
                    CONFIG.aem.outputJcrRoot +
                    '/apps/' +
                    CONFIG.aem.projectFolderName +
                    '/clientlibs/clientlibs-webpack-**/*'
                ),
            ],
        }),
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
        new BrotliGzipPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new AemClientlibGeneratorPlugin(CLIENTLIB_CONFIG),
    ],
    resolve: {
        extensions: ['.js', '.scss', '.css'],
        modules: [
            CONFIG.aem.jcrRoot +
            '/apps/' +
            CONFIG.aem.projectFolderName +
            '/components/webpack.resolve/',
            NODE_MODULES,
        ],
    },
    watchOptions: {
        ignored: [
            /node_modules/,
            '**/*.bundle.css',
            '**/*.bundle.js',
            '**/*.html',
            '**/*.xml',
        ],
    },
    optimization: {
        splitChunks: {
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'webpack-vendor',
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true,
                    minChunks: 2,
                },
            },
        },
        runtimeChunk: {
            name: 'runtime',
        },
    },
};

module.exports = WEBPACK_CONFIG_BASE;
