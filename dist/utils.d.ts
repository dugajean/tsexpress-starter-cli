export declare enum TemplateType {
    DOMAIN = "domain",
    ENTITY = "entity",
    SERVICE = "service",
    CONTROLLER = "controller"
}
export interface FileTree {
    name: string;
    success: string;
    scope: TemplateType;
    domainShouldExist: boolean;
}
export declare function makeFiles(options: FileTree): Promise<void>;
