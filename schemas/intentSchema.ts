import { z } from "zod";

export const AppIntentSchema = z.object({
  appName: z.string(),
  appType: z.enum([
    "crm",
    "project_management",
    "ecommerce",
    "hr_tool",
    "inventory",
    "content_platform",
    "analytics",
    "custom",
  ]),
  features: z.array(z.string()),
  entities: z.array(z.string()),
  integrations_requested: z.array(z.string()),
  assumptions: z.array(z.string()),
});