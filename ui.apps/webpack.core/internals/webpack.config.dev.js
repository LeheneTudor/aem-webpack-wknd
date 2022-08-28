const path = require('path');
const CONFIG = require('./../../webpack.project');
const CLIENTLIB_CONFIG = require('./clientlib.config.dev');
const NODE_MODULES = path.join(__dirname, '../node_modules');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractCSS = new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
});
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OptimizeCss = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.bundle.css/g,
});
const AemClientlibGeneratorPlugin = require('aem-clientlib-generator-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const WEBPACK_CONFIG_BASE = {
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
            {
                test: /.(jpg|jpeg|png|mp3)$/,
                use: ['file-loader'],
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
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
        extractCSS,
        OptimizeCss,
        new AemClientlibGeneratorPlugin(CLIENTLIB_CONFIG),
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
            '**/clientlibs-webpack-*/**',
            '**/*.bundle.css',
            '**/*.bundle.js',
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
