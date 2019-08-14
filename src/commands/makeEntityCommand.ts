import { makeFiles, TemplateType } from '../utils';

export default async function makeEntityCommand(entityName: string) {
  makeFiles({
    type: 'entity',
    name: entityName,
    template: TemplateType.ENTITY,
    success: `Successfully created ${entityName} entity.`,
    domainShouldExist: true
  });
}
