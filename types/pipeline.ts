export type AppType =
  | "crm"
  | "project_management"
  | "ecommerce"
  | "hr_tool"
  | "inventory"
  | "content_platform"
  | "analytics"
  | "custom";

export interface AppIntent {
  appName: string;
  appType: AppType;
  features: string[];
  entities: string[];
  integrations_requested: string[];
  assumptions: string[];
}

export interface EntityField {
  name: string;
  type: string;
  nullable: boolean;
  isRelation: boolean;
  isPrimary: boolean;
  isUnique: boolean;
}

export interface Relation {
  type: "hasMany" | "belongsTo" | "hasOne";
  target: string;
  foreignKey: string;
  onDelete: string;
}

export interface EntitySchema {
  name: string;
  tableName: string;
  fields: EntityField[];
  relations: Relation[];
}

export interface DataSchema {
  entities: EntitySchema[];
}