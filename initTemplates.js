const fs = require("fs");
const path = require("path");

const copyFolder = (from, to) => {
  fs.readdirSync(from).forEach((element) => {
    const fromPath = `${from}/${element}`;
    const toPath = `${to}/${element}`;
    if (fs.lstatSync(fromPath).isDirectory()) {
      fs.mkdirSync(toPath);
      copyFolder(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
};

const initTemplates = () => {
  const templatesPath = path.join(__dirname, "src/templates");
  const distPath = path.join(__dirname, "dist/templates");
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }
  copyFolder(templatesPath, distPath);
};

initTemplates();
