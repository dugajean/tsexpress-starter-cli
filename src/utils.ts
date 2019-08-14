import fs, { existsSync } from 'fs';
import ora from 'ora';
import path from 'path';
import chalk from 'chalk';
import changeCase from 'change-case';
import { singular, plural } from 'pluralize';

export enum TemplateType {
  DOMAIN = 'domain',
  ENTITY = 'entity',
  SERVICE = 'service',
  CONTROLLER = 'controller'
}

export interface FileTree {
  name: string;
  success: string;
  scope: TemplateType;
  domainShouldExist: boolean;
}

function fileTemplates(domain: string, scope: TemplateType = TemplateType.DOMAIN) {
  domain = plural(domain);

  const templates = {
    'controller.ts': `import ${changeCase.pascalCase(domain)}Service from './service';
import { Get } from '@tsexpress-starter/routes';

export default class Controller {
  ${changeCase.camelCase(domain)}Service: ${changeCase.pascalCase(domain)}Service;

  constructor() {
    this.${changeCase.camelCase(domain)}Service = new ${changeCase.pascalCase(domain)}Service();
  }

  @Get()
  sampleAction() {
    return 'Hello World';
  }
}
`,
    'service.ts': `export default class ${changeCase.pascalCase(domain)}Service {}`,
    'entity.ts': `export default class ${changeCase.pascalCase(singular(domain))} {}`
  };

  return scope === TemplateType.DOMAIN ? templates : { [scope + '.ts']: (templates as any)[scope + '.ts'] };
}

export async function makeFiles(options: FileTree) {
  const { name, success, scope, domainShouldExist } = options;

  let spinner;

  try {
    spinner = ora(`Creating new ${scope}: ${name}`);

    const appPath = path.join(process.cwd(), '/src/app/');
    const domainPath = path.join(appPath, name);
    const templates = fileTemplates(name, scope);

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
        spinner.fail(chalk.red(`Could not create "${name}" ${scope} as it already exists.`));
        break;
      case 'ENOENT':
        const msg = !domainShouldExist
          ? 'Could not find the "app" directory. Is this a TS Express Starter project?'
          : `Could not create ${scope} as the ${name} domain does not exist.`;

        spinner.fail(chalk.red(msg));
    }
  }
}
