export interface AppIntent {
  appName: string;
  appType:
    | "crm"
    | "project_management"
    | "ecommerce"
    | "hr_tool"
    | "inventory"
    | "content_platform"
    | "analytics"
    | "custom";

  features: string[];

  entities: string[];

  integrations_requested: string[];

  assumptions: string[];
}