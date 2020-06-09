const core = require('@actions/core');
const run = require('./src/index.js')

(async => {
  try {
    await run();
  } catch (err) {
    core.setFailed(error.message);
  }
})();
