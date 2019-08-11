#!/usr/bin/env node

import arg from 'arg';
import clear from 'clear';
import execa from 'execa';
import rimraf from 'rimraf';

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {
      '--create': String,
      '--add-domain': String
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  return {
    create: args['--create'] || '',
    addDomain: args['--add-domain'] || ''
  };
}

let options;

try {
  options = parseArgumentsIntoOptions(process.argv);
} catch (error) {
  console.error('Provide a name for your argument.');
  process.exit();
}

// console.log(options);
// process.exit();

if (options.create) {
  clear();

  (async () => {
    try {
      await execa('git', ['clone', 'https://github.com/dugajean/tsexpress-starter', options.create]);
      await execa('cd', [options.create]);
      rimraf.sync('.git');
    } catch (error) {
      console.log(error);
      return console.error('There was a problem while cloning the starter repository.');
    }
  })();
}
