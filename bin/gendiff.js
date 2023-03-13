#!/usr/bin/env node
import  { Command }  from 'commander';
import { outPutDiff } from '../src/index.js';
const program = new Command();



program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(outPutDiff)
  .parse();



