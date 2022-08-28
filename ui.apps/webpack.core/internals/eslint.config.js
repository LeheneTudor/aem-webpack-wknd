const merge = require('merge');
const CONFIG = require('./../../webpack.project');
const CONFIG_WEBPACK = require('./webpack.config.js');

const ESLINT_DEFAULT = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                paths:
                    (CONFIG_WEBPACK.resolve &&
                        CONFIG_WEBPACK.resolve.modules) ||
                    [],
            },
        },
    },
};

module.exports = merge.recursive(true, ESLINT_DEFAULT, CONFIG.eslint);
