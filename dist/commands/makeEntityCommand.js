"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function makeEntityCommand(entityName) {
    return __awaiter(this, void 0, void 0, function* () {
        utils_1.makeFiles({
            scope: utils_1.TemplateType.ENTITY,
            name: entityName,
            domainShouldExist: true,
            success: `Successfully created ${entityName} entity.`
        });
    });
}
exports.default = makeEntityCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZUVudGl0eUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbWFrZUVudGl0eUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9DQUFtRDtBQUVuRCxTQUE4QixpQkFBaUIsQ0FBQyxVQUFrQjs7UUFDaEUsaUJBQVMsQ0FBQztZQUNSLEtBQUssRUFBRSxvQkFBWSxDQUFDLE1BQU07WUFDMUIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixPQUFPLEVBQUUsd0JBQXdCLFVBQVUsVUFBVTtTQUN0RCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUE7QUFQRCxvQ0FPQyJ9