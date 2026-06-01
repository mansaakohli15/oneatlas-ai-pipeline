export interface Page {
  name: string;
  route: string;
  layout:
    | "list"
    | "detail"
    | "dashboard"
    | "settings";

  boundEntity: string;

  components: string[];
}

export interface ApiEndpoint {
  path: string;
  method: string;
  handlerDescription: string;
  boundEntity: string;
  authRequired: boolean;
  rateLimit: boolean;
}

export interface Role {
  name: string;
}

export interface Permission {
  role: string;
  entity: string;
  read: boolean;
  write: boolean;
  delete: boolean;
}

export interface AuthRules {
  roles: Role[];
  permissions: Permission[];
}

export interface IntegrationHook {
  integrationId: string;
  trigger: string;
  action: string;
}

export interface WorkflowStub {
  name: string;

  trigger: {
    entity: string;
    event: string;
    condition?: string;
  };

  integration: string;

  action: string;

  payload: Record<
    string,
    string
  >;
}

export interface AppSpec {
  pages: Page[];

  apiEndpoints: ApiEndpoint[];

  authRules: AuthRules;

  integrationHooks: IntegrationHook[];

  workflowStubs: WorkflowStub[];
}