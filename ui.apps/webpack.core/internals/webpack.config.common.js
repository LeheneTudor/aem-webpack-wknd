const path = require('path');
const CONFIG = require('./../../webpack.project');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const WEBPACK_CONFIG_COMMON = {
    target: 'browserslist',
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|mp3|svg)$/,
                type: 'asset/resource',
                include: /node_modules/,
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            }
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
        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            fix: true,
        }),
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
        alias: {
            '@module': path.resolve(__dirname, '../node_modules'),
            '@globals': path.resolve(__dirname, '../../src/main/content/jcr_root/apps/wknd/components/webpack.global'),
            '@resolve': path.resolve(__dirname, '../../src/main/content/jcr_root/apps/wknd/components/webpack.resolve'),
        },
        fallback: {
            "crypto": false,
            "path": false,
            "fs": false
        }
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
