#!/usr/bin/env node
import  Command  from 'commander';
const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');