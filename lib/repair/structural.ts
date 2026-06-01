import { AppIntent } from "@/types/intent";

function normalizeAppType(
  value?: string
): AppIntent["appType"] {
  if (!value) return "custom";

  const lower = value.toLowerCase();

  if (
    lower.includes("crm") ||
    lower.includes("customer")
  ) {
    return "crm";
  }

  if (
    lower.includes("project")
  ) {
    return "project_management";
  }

  if (
    lower.includes("ecommerce") ||
    lower.includes("commerce") ||
    lower.includes("shop")
  ) {
    return "ecommerce";
  }

  if (lower.includes("hr")) {
    return "hr_tool";
  }

  if (
    lower.includes("inventory")
  ) {
    return "inventory";
  }

  if (
    lower.includes("content")
  ) {
    return "content_platform";
  }

  if (
    lower.includes("analytics")
  ) {
    return "analytics";
  }

  return "custom";
}

export function repairIntent(
  intent: Partial<AppIntent>
): AppIntent {
  return {
    appName:
      intent.appName ||
      "Generated Application",

    appType: normalizeAppType(
      intent.appType
    ),

    features:
      intent.features || [],

    entities:
      intent.entities || [],

    integrations_requested:
      intent.integrations_requested ||
      [],

    assumptions:
      intent.assumptions || [],
  };
}