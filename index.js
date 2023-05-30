const loading = require("loading-cli");

const load = loading("loading text!!").start();
// stop
setTimeout(function () {
  load.stop();
}, 3000);
