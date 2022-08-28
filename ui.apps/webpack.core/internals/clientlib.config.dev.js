const CONFIG = require('./../../webpack.project');
const RESOURCES_PATH =
    CONFIG.aem.outputJcrRoot + '/apps/' + CONFIG.aem.projectFolderName + '/clientlibs/webpack.bundles/resources';
const CLIENTLIBS_PATH = CONFIG.aem.outputJcrRoot + '/apps/' + CONFIG.aem.projectFolderName + '/clientlibs';

module.exports = {
    context: __dirname,
    clientLibRoot: CLIENTLIBS_PATH,

    libs: [
        {
            name: 'wknd.webpack.runtime',
            outputPath: CLIENTLIBS_PATH + '/clientlibs-webpack-runtime',
            allowProxy: true,
            jsProcessor: ['default:none', 'min:none'],
            cssProcessor: ['default:none', 'min:none'],
            serializationFormat: 'xml',
            assets: {
                js: [RESOURCES_PATH + '/runtime.bundle.js'],
            },
        },
        {
            name: 'wknd.webpack.authoring',
            outputPath: CLIENTLIBS_PATH + '/clientlibs-webpack-authoring',
            allowProxy: true,
            jsProcessor: ['default:none', 'min:none'],
            cssProcessor: ['default:none', 'min:none'],
            serializationFormat: 'xml',
            assets: {
                js: [RESOURCES_PATH + '/webpack-authoring.bundle.js'],
                css: [RESOURCES_PATH + '/webpack-authoring.bundle.css'],
            },
        },
        {
            name: 'wknd.webpack.global',
            outputPath: CLIENTLIBS_PATH + '/clientlibs-webpack-global',
            allowProxy: true,
            jsProcessor: ['default:none', 'min:none'],
            cssProcessor: ['default:none', 'min:none'],
            serializationFormat: 'xml',
            assets: {
                js: [RESOURCES_PATH + '/webpack-global.bundle.js'],
                css: [RESOURCES_PATH + '/webpack-global.bundle.css'],
            },
        },
        {
            name: 'wknd.webpack.components',
            outputPath: CLIENTLIBS_PATH + '/clientlibs-webpack-components',
            allowProxy: true,
            jsProcessor: ['default:none', 'min:none'],
            cssProcessor: ['default:none', 'min:none'],
            serializationFormat: 'xml',
            assets: {
                js: [RESOURCES_PATH + '/webpack-components.bundle.js'],
                css: [RESOURCES_PATH + '/webpack-components.bundle.css'],
            },
        },
    ],
};
