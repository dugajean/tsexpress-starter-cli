import { makeFiles, TemplateType } from '../utils';

export default async function makeDomainCommand(domainName: string) {
  makeFiles({
    type: 'domain',
    name: domainName,
    template: TemplateType.ALL,
    domainShouldExist: false,
    success: `Successfully created ${domainName} domain. Head over to src/app/${domainName}!`
  });
}
