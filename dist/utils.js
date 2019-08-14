"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importStar(require("fs"));
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const change_case_1 = __importDefault(require("change-case"));
const pluralize_1 = require("pluralize");
var TemplateType;
(function (TemplateType) {
    TemplateType["DOMAIN"] = "domain";
    TemplateType["ENTITY"] = "entity";
    TemplateType["SERVICE"] = "service";
    TemplateType["CONTROLLER"] = "controller";
})(TemplateType = exports.TemplateType || (exports.TemplateType = {}));
function fileTemplates(domain, scope = TemplateType.DOMAIN) {
    domain = pluralize_1.plural(domain);
    const templates = {
        'controller.ts': `import ${change_case_1.default.pascalCase(domain)}Service from './service';
import { Get } from '@tsexpress-starter/routes';

export default class Controller {
  ${change_case_1.default.camelCase(domain)}Service: ${change_case_1.default.pascalCase(domain)}Service;

  constructor() {
    this.${change_case_1.default.camelCase(domain)}Service = new ${change_case_1.default.pascalCase(domain)}Service();
  }

  @Get()
  sampleAction() {
    return 'Hello World';
  }
}
`,
        'service.ts': `export default class ${change_case_1.default.pascalCase(domain)}Service {}`,
        'entity.ts': `export default class ${change_case_1.default.pascalCase(pluralize_1.singular(domain))} {}`
    };
    return scope === TemplateType.DOMAIN ? templates : { [scope + '.ts']: templates[scope + '.ts'] };
}
function makeFiles(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, success, scope, domainShouldExist } = options;
        let spinner;
        try {
            spinner = ora_1.default(`Creating new ${scope}: ${name}`);
            const appPath = path_1.default.join(process.cwd(), '/src/app/');
            const domainPath = path_1.default.join(appPath, name);
            const templates = fileTemplates(name, scope);
            yield fs_1.default.promises.access(appPath);
            if (!domainShouldExist) {
                yield fs_1.default.promises.mkdir(domainPath);
            }
            else {
                yield fs_1.default.promises.access(domainPath);
            }
            for (const file in templates) {
                if (templates.hasOwnProperty(file) && !fs_1.existsSync(path_1.default.join(domainPath, file))) {
                    yield fs_1.default.promises.writeFile(path_1.default.join(domainPath, file), templates[file]);
                }
            }
            spinner.succeed(chalk_1.default.green(success));
        }
        catch (error) {
            switch (error.code) {
                case 'EEXIST':
                    spinner.fail(chalk_1.default.red(`Could not create "${name}" ${scope} as it already exists.`));
                    break;
                case 'ENOENT':
                    const msg = !domainShouldExist
                        ? 'Could not find the "app" directory. Is this a TS Express Starter project?'
                        : `Could not create ${scope} as the ${name} domain does not exist.`;
                    spinner.fail(chalk_1.default.red(msg));
            }
        }
    });
}
exports.makeFiles = makeFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsOENBQXNCO0FBQ3RCLGdEQUF3QjtBQUN4QixrREFBMEI7QUFDMUIsOERBQXFDO0FBQ3JDLHlDQUE2QztBQUU3QyxJQUFZLFlBS1g7QUFMRCxXQUFZLFlBQVk7SUFDdEIsaUNBQWlCLENBQUE7SUFDakIsaUNBQWlCLENBQUE7SUFDakIsbUNBQW1CLENBQUE7SUFDbkIseUNBQXlCLENBQUE7QUFDM0IsQ0FBQyxFQUxXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBS3ZCO0FBU0QsU0FBUyxhQUFhLENBQUMsTUFBYyxFQUFFLFFBQXNCLFlBQVksQ0FBQyxNQUFNO0lBQzlFLE1BQU0sR0FBRyxrQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXhCLE1BQU0sU0FBUyxHQUFHO1FBQ2hCLGVBQWUsRUFBRSxVQUFVLHFCQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7OztJQUl4RCxxQkFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7OztXQUc5RCxxQkFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLHFCQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7Q0FRcEY7UUFDRyxZQUFZLEVBQUUsd0JBQXdCLHFCQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1FBQy9FLFdBQVcsRUFBRSx3QkFBd0IscUJBQVUsQ0FBQyxVQUFVLENBQUMsb0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLO0tBQ2xGLENBQUM7SUFFRixPQUFPLEtBQUssS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUcsU0FBaUIsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUM1RyxDQUFDO0FBRUQsU0FBc0IsU0FBUyxDQUFDLE9BQWlCOztRQUMvQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFNUQsSUFBSSxPQUFPLENBQUM7UUFFWixJQUFJO1lBQ0YsT0FBTyxHQUFHLGFBQUcsQ0FBQyxnQkFBZ0IsS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7WUFFaEQsTUFBTSxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDdEQsTUFBTSxVQUFVLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUMsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUU3QyxNQUFNLFlBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWxDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDdEIsTUFBTSxZQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxNQUFNLFlBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsS0FBSyxNQUFNLElBQUksSUFBSSxTQUFTLEVBQUU7Z0JBQzVCLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQVUsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUM5RSxNQUFNLFlBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFHLFNBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDcEY7YUFDRjtZQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLEtBQUssUUFBUTtvQkFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksS0FBSyxLQUFLLHdCQUF3QixDQUFDLENBQUMsQ0FBQztvQkFDckYsTUFBTTtnQkFDUixLQUFLLFFBQVE7b0JBQ1gsTUFBTSxHQUFHLEdBQUcsQ0FBQyxpQkFBaUI7d0JBQzVCLENBQUMsQ0FBQywyRUFBMkU7d0JBQzdFLENBQUMsQ0FBQyxvQkFBb0IsS0FBSyxXQUFXLElBQUkseUJBQXlCLENBQUM7b0JBRXRFLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7SUFDSCxDQUFDO0NBQUE7QUF4Q0QsOEJBd0NDIn0=