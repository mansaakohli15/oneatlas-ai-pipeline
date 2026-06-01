import { DataSchema } from "@/types/schema";
import { AppSpec } from "@/types/appspec";

export function repairConsistency(
  spec: AppSpec,
  schema: DataSchema
) {
  const entityNames =
    schema.entities.map(
      (e) => e.name
    );

  spec.workflowStubs =
    spec.workflowStubs.filter(
      (workflow) =>
        entityNames.includes(
          workflow.trigger.entity
        )
    );

  return spec;
}