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
    .option("-c --with-css <value>", "Create with css file")
    .option("-H --with-hooks <value>", "Create with hooks folder")
    .option("-C --with-components <value>", "Create with components folder")
    .action(createComponent);

  create.command("hook <hookName>").action((hookName) => {});

  console.log(textSync("-- Aprehende cli tool --"));
  program.parse(process.argv);
};

main();
