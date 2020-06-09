const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const tc = require('@actions/tool-cache');

async function run() {
  try {
    const version =
      core.getInput('version', { required : true });
    const bazelBinPath =
      core.getInput('bazel-install-path', { required : true });

    const bazeliskPath =
      await tc.downloadTool(`https://github.com/bazelbuild/bazelisk/releases/download/v${version}/bazelisk-linux-amd64`);
    core.debug('Finished downloading to bazeliskPath');

    // Create directory, move into directory, chmod +x bazel, and add to path.
    await io.mkdirP(bazelBinPath);
    await io.mv(bazeliskPath, `${bazelBinPath}/bazel`);
    await exec.exec('chmod', ['+x', `${bazelBinPath}/bazel`]);
    core.debug('Chmodded!')
    await core.addPath(`${bazelBinPath}/bazel`);
    core.debug('Added to path:\n');
    core.debug(process.env.PATH);
    
  } catch (err) {
    core.error(err);
    throw new Error(err);
  }
}

module.exports = run;
