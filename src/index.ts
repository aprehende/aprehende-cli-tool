#!/usr/bin/env node

import figlet from "figlet";
import { Command } from "commander";

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
    .option("-c --with-css <value>", "Create with css file")
    .option("-H --with-hooks <value>", "Create with hooks folder")
    .option("-C --with-components <value>", "Create with components folder")
    .action((componentName, options) => {});

  create.command("hook <hookName>").action((hookName) => {});

  console.log(figlet.textSync("-- Aprehende cli tool --"));
  program.parse(process.argv);
};

main();
