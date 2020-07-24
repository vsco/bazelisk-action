const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const tc = require('@actions/tool-cache');
const util = require('util')

async function run() {
  try {
    core.debug('Begin Bazelisk Action');

    // define the base github url for bazelisk downloads
    const BASE_DOWNLOAD_URL =
      'https://github.com/bazelbuild/bazelisk/releases/download';
    core.debug(util.format('Base Bazelisk URL: %s', BASE_DOWNLOAD_URL));

    const version =
      core.getInput('version', { required : true });
    core.debug(util.format('version: %s', version));

    const bazelBinPath =
      core.getInput('bazel-install-path', { required : true });
    core.debug(util.format('bazel-install-path: %s', bazelBinPath));

    const os =
      core.getInput('os', { required : true })
    core.debug(util.format('os: %s', os));

    let bazeliskBinaryURL = ''
    switch (util.format("%s", os).toLowerCase()) {
      case 'darwin':
      case 'macos':
        bazeliskBinaryURL =
          util.format('%s/v%s/bazelisk-darwin-amd64', BASE_DOWNLOAD_URL, version)
        break;
      case 'windows':
        bazeliskBinaryURL =
          util.format('%s/v%s/bazelisk-windows-amd64.exe', BASE_DOWNLOAD_URL, version)
        break;
      case 'linux':
      default:
        bazeliskBinaryURL =
          util.format('%s/v%s/bazelisk-linux-amd64', BASE_DOWNLOAD_URL, version)
    }
    core.debug(util.format('bazelisk download url: %s', bazeliskBinaryURL));

    const bazeliskPath =
      await tc.downloadTool(bazeliskBinaryURL);
    core.debug(util.format('Downloaded bazelisk binary to %s', bazelBinPath));

    // Create directory, move into directory, chmod +x bazel, and add to path.
    await io.mkdirP(bazelBinPath);
    await io.mv(bazeliskPath, `${bazelBinPath}/bazel`);
    await exec.exec('chmod', ['+x', `${bazelBinPath}/bazel`]);
    await core.addPath(`${bazelBinPath}`);
    core.debug(`Added ${bazelBinPath}/bazel to PATH`);

  } catch (err) {
    core.error(err);
    throw new Error(err);
  }
}

module.exports = run;
