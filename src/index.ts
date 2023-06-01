#!/usr/bin/env node

import { textSync } from 'figlet';
import { Command } from 'commander';
import { createComponent, createConfigFile, createHook } from './actions';
import { generateTemplate } from './actions';

const main = () => {
  const program = new Command();
  program
    .version('v1.1.0')
    .description(
      'Learn CLI Tool is a command line interface (CLI) tool designed to improve your workflow when developing applications with React.'
    );

  program.command('init').action(createConfigFile);

  program
    .command('generate')
    .command('template <templateName>')
    .action(generateTemplate);

  const create = program.command('create');

  create
    .command('component <componentName>')
    .option('-j --only-js', 'Create with js file')
    .option('-c --with-css', 'Create with css file')
    .option('-H --with-hooks', 'Create with hooks folder')
    .option('-s --with-styled', 'Create with styled components')
    .option('-C --with-components', 'Create with components folder')
    .option(
      '-f --with-full',
      'Create with all options (css, styled, components, hooks)'
    )
    .action(createComponent);

  create
    .command('hook <hookName>')
    .option('-j --only-js', 'Create with js file')
    .action(createHook);

  program.addHelpText(
    'before',
    textSync('Aprehende cli', {
      width: 80,
    })
  );

  program.parse(process.argv);
};

main();
