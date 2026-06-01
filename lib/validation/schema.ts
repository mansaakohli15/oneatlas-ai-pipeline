import { DataSchema } from "@/types/schema";

export function validateSchema(
  schema: DataSchema
) {
  const errors: string[] = [];

  const entityNames =
    schema.entities.map(
      (e) => e.name
    );

  for (const entity of schema.entities) {

    const fields =
      entity.fields.map(
        (f) => f.name
      );

    if (!fields.includes("id")) {
      errors.push(
        `${entity.name} missing id`
      );
    }

    if (!fields.includes("tenantId")) {
      errors.push(
        `${entity.name} missing tenantId`
      );
    }

    if (!fields.includes("createdAt")) {
      errors.push(
        `${entity.name} missing createdAt`
      );
    }

    for (const relation of entity.relations) {
      if (
        !entityNames.includes(
          relation.target
        )
      ) {
        errors.push(
          `${entity.name} references missing entity ${relation.target}`
        );
      }
    }
  }

  return {
    valid:
      errors.length === 0,
    errors,
  };
}