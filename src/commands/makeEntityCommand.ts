import { makeFiles, TemplateType } from '../utils';

export default async function makeEntityCommand(entityName: string) {
  makeFiles({
    scope: TemplateType.ENTITY,
    name: entityName,
    domainShouldExist: true,
    success: `Successfully created ${entityName} entity.`
  });
}
