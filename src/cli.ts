#!/usr/bin/env node

import program from 'commander';
import newCommand from './commands/newCommand';
import makeDomainCommand from './commands/makeDomainCommand';
import makeEntityCommand from './commands/makeEntityCommand';

program
  .name('TSExpress Starter CLI')
  .description('Simple CLI to generate a TypeScript and Express application and more.')
  .version('0.1.0');

program
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

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
