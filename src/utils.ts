import fs, { existsSync } from 'fs';
import ora from 'ora';
import path from 'path';
import chalk from 'chalk';
import changeCase from 'change-case';
import { singular, plural } from 'pluralize';

export enum TemplateType {
  ALL = 'all',
  ENTITY = 'entity',
  SERVICE = 'service',
  CONTROLLER = 'controller'
}

export interface FileTree {
  type: string;
  name: string;
  success: string;
  template: TemplateType;
  domainShouldExist: boolean;
}

function fileTemplates(domain: string, name: string, scope: TemplateType = TemplateType.ALL) {
  name = plural(name);

  const templates = {
    'controller.ts': `import ${changeCase.pascalCase(name)}Service from './service';
import { Get } from '@tsexpress-starter/routes';

export default class Controller {
  ${changeCase.camelCase(name)}Service: ${changeCase.pascalCase(name)}Service;

  constructor() {
    this.${changeCase.camelCase(name)}Service = new ${changeCase.pascalCase(name)}Service();
  }

  @Get()
  sampleAction() {
    return 'Hello World';
  }
}
`,
    'service.ts': `export default class ${changeCase.pascalCase(name)}Service {}`,
    'entity.ts': `export default class ${changeCase.pascalCase(singular(domain))} {}`
  };

  return scope === 'all' ? templates : { [scope + '.ts']: (templates as any)[scope + '.ts'] };
}

export async function makeFiles(options: FileTree) {
  const { type, name, success, template, domainShouldExist } = options;

  let spinner;

  try {
    spinner = ora(`Creating new ${type}: ${name}`);

    const appPath = path.join(process.cwd(), '/src/app/');
    const domainPath = path.join(appPath, name);
    const templates = fileTemplates(name, type, template);

    await fs.promises.access(appPath);

    if (!domainShouldExist) {
      await fs.promises.mkdir(domainPath);
    } else {
      await fs.promises.access(domainPath);
    }

    for (const file in templates) {
      if (templates.hasOwnProperty(file) && !existsSync(path.join(domainPath, file))) {
        await fs.promises.writeFile(path.join(domainPath, file), (templates as any)[file]);
      }
    }

    spinner.succeed(chalk.green(success));
  } catch (error) {
    switch (error.code) {
      case 'EEXIST':
        spinner.fail(chalk.red(`Could not create "${name}" ${type} as it already exists.`));
        break;
      case 'ENOENT':
        const msg = !domainShouldExist
          ? 'Could not find the "app" directory. Is this a TS Express Starter project?'
          : `Could not create ${type} as the ${name} domain does not exist.`;

        spinner.fail(chalk.red(msg));
    }
  }
}
