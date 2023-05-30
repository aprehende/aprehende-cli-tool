const fs = require("fs-extra");
const path = require("path");

const dist = path.join(__dirname, "dist");

fs.removeSync(dist);
