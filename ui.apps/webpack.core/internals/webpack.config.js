const path = require('path');

const CONFIG = require('../../webpack.project');
const IS_PROD = 'production';
const IS_DEV_ENV = 'devenv';
const IS_DEV = 'development';

const WEBPACK_CONFIG_BASE = (function () {
    let config;

    switch (process.env.NODE_ENV) {
        case IS_PROD:
            config = path.resolve(__dirname, './webpack.config.prod.js');
            break;
        case IS_DEV_ENV:
            config = path.resolve(__dirname, './webpack.config.devenv.js');
            break;
        case IS_DEV:
            config = path.resolve(__dirname, './webpack.config.dev.js');
            break;
        default:
            config = path.resolve(__dirname, './webpack.config.prod.js');
            break;
    }

    return config;
})(path);

if (typeof CONFIG.webpack.extends === 'string') {
    // Convert string into array so we can apply our base config
    CONFIG.webpack.extends = [CONFIG.webpack.extends];
}

CONFIG.webpack.extends = CONFIG.webpack.extends || [];
CONFIG.webpack.extends.push(WEBPACK_CONFIG_BASE);

module.exports = CONFIG.webpack;
