import { AppIntent } from "@/types/intent";
import { ValidationResult } from "@/types/validation";

export function validateIntent(
  intent: Partial<AppIntent>
): ValidationResult {
  const errors: string[] = [];

  const validTypes = [
    "crm",
    "project_management",
    "ecommerce",
    "hr_tool",
    "inventory",
    "content_platform",
    "analytics",
    "custom",
  ];

  if (!intent.appName) {
    errors.push("Missing appName");
  }

  if (!intent.appType) {
    errors.push("Missing appType");
  } else if (
    !validTypes.includes(intent.appType as string)
  ) {
    errors.push("Invalid appType");
  }

  if (
    !intent.features ||
    !Array.isArray(intent.features) ||
    intent.features.length === 0
  ) {
    errors.push("Missing features");
  }

  if (
    !intent.entities ||
    !Array.isArray(intent.entities) ||
    intent.entities.length === 0
  ) {
    errors.push("Missing entities");
  }

  if (
    intent.integrations_requested &&
    !Array.isArray(
      intent.integrations_requested
    )
  ) {
    errors.push(
      "integrations_requested must be an array"
    );
  }

  if (
    intent.assumptions &&
    !Array.isArray(intent.assumptions)
  ) {
    errors.push(
      "assumptions must be an array"
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}