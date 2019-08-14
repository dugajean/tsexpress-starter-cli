import ora from 'ora';
import path from 'path';
import chalk from 'chalk';
import execa from 'execa';
import rimraf from 'rimraf';

export default async function newCommand(projectName: string) {
  let spinner;

  try {
    spinner = ora({
      text: `Creating your project under ${projectName}...`,
      spinner: 'dots',
      color: 'magenta'
    }).start();

    await execa('git', ['clone', 'https://github.com/dugajean/tsexpress-starter', projectName, '--depth=1']);

    spinner.succeed(
      chalk.green(`Your project has been successfully created!

To get started, run:

- cd ${projectName}
- npm install
- npm run dev

Happy coding!`)
    );

    rimraf.sync(path.join(process.cwd(), projectName, '.git'));
  } catch (error) {
    spinner.fail(chalk.red(`Could not create project. Does a folder named "${projectName}" already exist?`));
  }
}
