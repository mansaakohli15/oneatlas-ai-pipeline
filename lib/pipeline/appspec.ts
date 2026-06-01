import { DataSchema } from "@/types/schema";
import { AppSpec } from "@/types/appspec";
import { AppIntent } from "@/types/intent";
import { integrationRegistry } from "@/lib/integrations/registry";

export function generateAppSpec(
  schema: DataSchema,
  intent: AppIntent
): AppSpec {
  const pages = schema.entities.map(
    (entity) => ({
      name: `${entity.name} List`,
      route: `/${entity.tableName}`,
      layout: "list" as const,
      boundEntity: entity.name,
      components: ["table", "form"],
    })
  );

  const apiEndpoints =
    schema.entities.map((entity) => ({
      path: `/api/${entity.tableName}`,
      method: "GET",
      handlerDescription: `Fetch ${entity.name}`,
      boundEntity: entity.name,
      authRequired: true,
      rateLimit: true,
    }));

  const authRules = {
    roles: [
      { name: "admin" },
      { name: "manager" },
      { name: "user" },
    ],

    permissions:
      schema.entities.flatMap(
        (entity) => [
          {
            role: "admin",
            entity: entity.name,
            read: true,
            write: true,
            delete: true,
          },
          {
            role: "manager",
            entity: entity.name,
            read: true,
            write: true,
            delete: false,
          },
          {
            role: "user",
            entity: entity.name,
            read: true,
            write: false,
            delete: false,
          },
        ]
      ),
  };

  const requestedIntegrations =
    integrationRegistry.filter(
      (integration) =>
        intent.integrations_requested.some(
          (req) =>
            req.toLowerCase() ===
            integration.id.toLowerCase()
        )
    );

  const integrationHooks =
    requestedIntegrations.map(
      (integration) => ({
        integrationId:
          integration.id,
        trigger:
          integration.triggers[0],
        action:
          integration.actions[0],
      })
    );

  const workflowStubs =
    requestedIntegrations.map(
      (integration) => {
        let entity =
          schema.entities[0]?.name ||
          "Record";

        let event = "created";
        let condition:
          | string
          | undefined;

        if (
          integration.id ===
          "whatsapp"
        ) {
          entity = "Deals";
          event = "status_changed";
          condition =
            "status === 'closed'";
        }

        if (
          integration.id ===
          "slack"
        ) {
          entity = "Tasks";
          event = "updated";
        }

        if (
          integration.id ===
          "gmail"
        ) {
          entity = "Orders";
          event = "created";
        }

        return {
          name: `${integration.displayName} Workflow`,

          trigger: {
            entity,
            event,
            condition,
          },

          integration:
            integration.id,

          action:
            integration.actions[0],

          payload: {
            entityId: "id",
            tenantId: "tenantId",
          },
        };
      }
    );

  return {
    pages,
    apiEndpoints,
    authRules,
    integrationHooks,
    workflowStubs,
  };
}