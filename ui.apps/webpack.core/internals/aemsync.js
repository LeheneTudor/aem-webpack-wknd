import { aemsync } from 'aemsync'

const workingDir = "../../";

// Arguments below are optional.
const targets = ["http://admin:admin@localhost:4502"];
const exclude = [
  "**/jcr_root/*",
  "**/conf/*",
  "**/apps/*",
  "**/ui.content.sample/**",
  "**/@(.git|.svn|.hg|target|.githooks|.run|all)",
  "**/@(src|main|content|target|.githooks|.run|all|jcr_root|settings|wcm|apps|ui.content.sample)",
  "**/@(.git|.svn|.hg|target|META-INF|ui.tests|ui.frontend|ui.content|ui.config|ui.apps.structure|it.tests|dispatcher|core|all|.run|.githooks)/**",
  "**/webpack.*/**/*.scss",
  "**/webpack.*/**/*.js",
];
const packmgrPath = "/crx/packmgr/service.jsp";
const interval = 0;
const onPushEnd = (err, target) => {
  console.log(target);
  if (err) {
    console.log(`Error when pushing package to ${target}.`, err.message);
  }
};
const checkBeforePush = false;

(async function () {
  const args = { workingDir, targets, exclude, packmgrPath, interval, onPushEnd, checkBeforePush };

  for await (const result of aemsync(args)) {
    // this prints too much info, remove this comment for debugging purposes
    // console.log(result.response);
  }
})();
