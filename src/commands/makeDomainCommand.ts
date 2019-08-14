import { makeFiles, TemplateType } from '../utils';

export default async function makeDomainCommand(domainName: string) {
  makeFiles({
    scope: TemplateType.DOMAIN,
    name: domainName,
    domainShouldExist: false,
    success: `Successfully created ${domainName} domain. Head over to src/app/${domainName}!`
  });
}
