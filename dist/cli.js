#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const newCommand_1 = __importDefault(require("./commands/newCommand"));
const makeDomainCommand_1 = __importDefault(require("./commands/makeDomainCommand"));
const makeEntityCommand_1 = __importDefault(require("./commands/makeEntityCommand"));
commander_1.default
    .name('TSExpress Starter CLI')
    .description('Simple CLI to generate a TypeScript and Express application and more.')
    .version('0.1.0');
commander_1.default
    .command('new <name>')
    .description('Scaffold a new TS Express project')
    .action(newCommand_1.default);
commander_1.default
    .command('make:domain <name>')
    .description("Creates a folder for your domain's logic within the app folder.")
    .action(makeDomainCommand_1.default);
commander_1.default
    .command('make:entity <domain>')
    .description('Creates an entity file within the designated domain.')
    .action(makeEntityCommand_1.default);
commander_1.default.parse(process.argv);
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSwwREFBZ0M7QUFDaEMsdUVBQStDO0FBQy9DLHFGQUE2RDtBQUM3RCxxRkFBNkQ7QUFFN0QsbUJBQU87S0FDSixJQUFJLENBQUMsdUJBQXVCLENBQUM7S0FDN0IsV0FBVyxDQUFDLHVFQUF1RSxDQUFDO0tBQ3BGLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVwQixtQkFBTztLQUNKLE9BQU8sQ0FBQyxZQUFZLENBQUM7S0FDckIsV0FBVyxDQUFDLG1DQUFtQyxDQUFDO0tBQ2hELE1BQU0sQ0FBQyxvQkFBVSxDQUFDLENBQUM7QUFFdEIsbUJBQU87S0FDSixPQUFPLENBQUMsb0JBQW9CLENBQUM7S0FDN0IsV0FBVyxDQUFDLGlFQUFpRSxDQUFDO0tBQzlFLE1BQU0sQ0FBQywyQkFBaUIsQ0FBQyxDQUFDO0FBRTdCLG1CQUFPO0tBQ0osT0FBTyxDQUFDLHNCQUFzQixDQUFDO0tBQy9CLFdBQVcsQ0FBQyxzREFBc0QsQ0FBQztLQUNuRSxNQUFNLENBQUMsMkJBQWlCLENBQUMsQ0FBQztBQUU3QixtQkFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtJQUNqQyxtQkFBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0NBQ3RCIn0=