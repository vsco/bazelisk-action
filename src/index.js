const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const tc = require('@actions/tool-cache');
const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;

async function run() {
  try {
    const version = core.getInput('version', { required : true });
    const bazeliskPath = 
      await tc.downloadTool(`https://github.com/bazelbuild/bazel/releases/download/${version}/bazel_${version}-linux-x86_64.deb`);
    await exec.exec('su');
    await exec.exec('dpkg', ['--force-all', '-i', `bazel_${version}-linux-x86_64.deb`]);

  } catch (err) {
    core.error(err);
    throw new Error(err);
  }
}

module.exports = run;
