const { execSync } = require('child_process');

process.openStdin().on("keypress", function (chunk, key) {
    console.log('pressed...' + ' ' + key)
    if (key && (key.name === "c" && key.ctrl) || (key.name === "." && key.cmd)) {
        var isWin = process.platform === "win32";

        if (!isWin) return;

        process.exit();
    }
});

process.on('SIGINT', function () {
    const isWin = process.platform === "win32";

    if (!isWin) return;

    console.log("Killing all NODE precesses...");

    const output = execSync('taskkill /im node.exe /F', { encoding: 'utf-8' });

    console.log(output)

    process.exit();
});
