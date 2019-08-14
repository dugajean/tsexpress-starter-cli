import { makeFiles, TemplateType } from '../utils';

export default async function makeEntityCommand(entityName: string) {
  makeFiles({
    scope: TemplateType.ENTITY,
    name: entityName,
    success: `Successfully created ${entityName} entity.`,
    domainShouldExist: true
  });
}
