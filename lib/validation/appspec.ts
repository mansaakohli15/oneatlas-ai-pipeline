import { AppSpec }
from "@/types/appspec";

import { DataSchema }
from "@/types/schema";

export function validateAppSpec(
  appSpec: AppSpec,
  schema: DataSchema
) {
  const errors: string[] = [];

  const entityNames =
    schema.entities.map(
      (e) => e.name
    );

  for (
    const page of appSpec.pages
  ) {
    const hasApi =
      appSpec.apiEndpoints.some(
        (api) =>
          api.boundEntity ===
          page.boundEntity
      );

    if (!hasApi) {
      errors.push(
        `Page ${page.name} missing API`
      );
    }
  }

  for (
    const workflow of
    appSpec.workflowStubs
  ) {
    if (
      !entityNames.includes(
        workflow.trigger.entity
      )
    ) {
      errors.push(
        `Workflow entity not found: ${workflow.trigger.entity}`
      );
    }
  }

  return {
    valid:
      errors.length === 0,
    errors,
  };
}