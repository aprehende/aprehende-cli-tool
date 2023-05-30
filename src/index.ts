#!/usr/bin/env node

import { textSync } from "figlet";
import { Command } from "commander";
import { createComponent } from "./utils";

const main = () => {
  const program = new Command();
  program
    .version("1.0.0")
    .description(
      "Learn CLI Tool is a command line interface (CLI) tool designed to improve your workflow when developing applications with React."
    );

  const create = program.command("create");

  create
    .command("component <componentName>")
    .option("-j --only-js", "Create with js file")
    .option("-c --with-css", "Create with css file")
    .option("-H --with-hooks", "Create with hooks folder")
    .option("-s --with-styled", "Create with styled components")
    .option("-C --with-components", "Create with components folder")
    .action(createComponent);

  create.command("hook <hookName>").action((hookName) => {});

  console.log(textSync("-- Aprehende cli tool --"));
  program.parse(process.argv);
};

main();
