import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';

async function run(): Promise<void> {
  try {
    core.debug('Begin Bazelisk Action');

    const os = core.getInput('os', {required: true});
    const version = core.getInput('version', {required: true});
    const bazelBinPath = core.getInput('bazel-install-path', {
      required: true
    });

    const bazeliskPath = await tc.downloadTool(
      `https://github.com/bazelbuild/bazelisk/releases/download/v${version}/bazelisk-${os}-amd64`
    );

    core.debug('Successfully downloaded binary to bazeliskPath');

    // Create directory, move into directory, chmod +x bazel, and add to path.
    await io.mkdirP(bazelBinPath);
    await io.mv(bazeliskPath, `${bazelBinPath}/bazel`);
    await exec.exec('chmod', ['+x', `${bazelBinPath}/bazel`]);
    await core.addPath(`${bazelBinPath}`);

    core.debug(`Added ${bazelBinPath}/bazel to PATH`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
