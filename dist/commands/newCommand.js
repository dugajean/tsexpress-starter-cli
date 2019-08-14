"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = __importDefault(require("execa"));
const rimraf_1 = __importDefault(require("rimraf"));
function newCommand(projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        let spinner;
        try {
            spinner = ora_1.default({
                text: `Creating your project under ${projectName}...`,
                spinner: 'dots',
                color: 'magenta'
            }).start();
            yield execa_1.default('git', ['clone', 'https://github.com/dugajean/tsexpress-starter', projectName, '--depth=1']);
            spinner.succeed(chalk_1.default.green(`Your project has been successfully created!

To get started, run:

- cd ${projectName}
- npm install
- npm run dev

Happy coding!`));
            rimraf_1.default.sync(path_1.default.join(process.cwd(), projectName, '.git'));
        }
        catch (error) {
            spinner.fail(chalk_1.default.red(`Could not create project. Does a folder named "${projectName}" already exist?`));
        }
    });
}
exports.default = newCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3Q29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9uZXdDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBc0I7QUFDdEIsZ0RBQXdCO0FBQ3hCLGtEQUEwQjtBQUMxQixrREFBMEI7QUFDMUIsb0RBQTRCO0FBRTVCLFNBQThCLFVBQVUsQ0FBQyxXQUFtQjs7UUFDMUQsSUFBSSxPQUFPLENBQUM7UUFFWixJQUFJO1lBQ0YsT0FBTyxHQUFHLGFBQUcsQ0FBQztnQkFDWixJQUFJLEVBQUUsK0JBQStCLFdBQVcsS0FBSztnQkFDckQsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsS0FBSyxFQUFFLFNBQVM7YUFDakIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRVgsTUFBTSxlQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLCtDQUErQyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBRXpHLE9BQU8sQ0FBQyxPQUFPLENBQ2IsZUFBSyxDQUFDLEtBQUssQ0FBQzs7OztPQUlYLFdBQVc7Ozs7Y0FJSixDQUFDLENBQ1YsQ0FBQztZQUVGLGdCQUFNLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzVEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsa0RBQWtELFdBQVcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1NBQzFHO0lBQ0gsQ0FBQztDQUFBO0FBNUJELDZCQTRCQyJ9