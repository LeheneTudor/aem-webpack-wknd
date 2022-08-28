const cache = {};

function importAll(r) {
    r.keys().forEach(function (key) {
        cache[key] = r(key);
        return cache;
    });
}

// Include all files named "index.js" in "webpack.authoring" folder from wknd root.
importAll(
    require.context(
        './../../src/main/content/jcr_root/apps/wknd/',
        true,
        /\/webpack\.authoring\/index\.js$/
    )
);
