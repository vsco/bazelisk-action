const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const tc = require('@actions/tool-cache');
const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;
const run = require('./src/index.js')

(async => {
  try {
    await run();
  } catch (err) {
    core.setFailed(error.message);
  }
})();
