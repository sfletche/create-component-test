#!/usr/bin/env node

const program = require('commander');
const createComponentTests = require('./src/create-component-tests');

program
  .command('create <component> <dest>')
  .description('Create initial unit tests based on rendered components')
  .version('0.0.1')
  .action((component, dest) => createComponentTests(component, dest))

program.parse(process.argv); // end with parse to parse through the input
