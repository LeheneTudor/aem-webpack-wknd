const path = require('path');
const CONFIG = require('./../../webpack.project');
const CLIENTLIB_CONFIG = require('./clientlib.config.prod');
const NODE_MODULES = path.join(__dirname, '../node_modules');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AemClientlibGeneratorPlugin = require('aem-clientlib-generator-webpack-plugin');

const WEBPACK_CONFIG_COMMON = {
    module: {
        rules: [
            {
                test: /.(jpg|jpeg|png|mp3|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    output: {
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

module.exports = WEBPACK_CONFIG_COMMON;
