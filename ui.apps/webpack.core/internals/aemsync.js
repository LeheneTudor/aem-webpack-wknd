const aemsync = require('aemsync');
const workingDir = '../../';

// Arguments below are optional.
const targets = ['http://admin:admin@localhost:4502'];
const exclude = [
    '**/jcr_root/*',
    '**/conf/*',
    '**/apps/*',
    '**/ui.content.sample/**',
    '**/@(.git|.svn|.hg|target|.githooks|.run|all)',
    '**/@(src|main|content|target|.githooks|.run|all|jcr_root|settings|wcm|apps|ui.content.sample)',
    '**/@(.git|.svn|.hg|target|META-INF|ui.tests|ui.frontend|ui.content|ui.config|ui.apps.structure|it.tests|dispatcher|core|all|.run|.githooks)/**',
    '**/webpack.*/**/*.scss',
    '**/webpack.*/**/*.js',
];
const packmgrPath = '/crx/packmgr/service.jsp';
const interval = 0;
const onPushEnd = (err, target) => {
    // Called for each of the targets.
    console.log(target);
    if (err) {
        console.log(`Error when pushing package to ${target}.`, err.message);
    }
};
const checkBeforePush = false;

aemsync(workingDir, {
    targets,
    exclude,
    interval,
    packmgrPath,
    onPushEnd,
    checkBeforePush,
});
