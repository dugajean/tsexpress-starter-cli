#!/usr/bin/env node

import program from 'commander';
import newCommand from './commands/newCommand';
import makeDomainCommand from './commands/makeDomainCommand';
import makeEntityCommand from './commands/makeEntityCommand';

program
  .version('0.1.0')
  .command('new <name>')
  .description('Scaffold a new TS Express project')
  .action(newCommand);

program
  .command('make:domain <name>')
  .description("Creates a folder for your domain's logic within the app folder.")
  .action(makeDomainCommand);

program
  .command('make:entity <domain>')
  .description('Creates an entity file within the designated domain.')
  .action(makeEntityCommand);

program.parse(process.argv);
