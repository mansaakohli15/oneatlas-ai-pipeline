import { generateWithFallback } from "../ai/gateway";
import { validateIntent } from "../validation/intent";
import { repairIntent } from "../repair/structural";
import { pipelineLog } from "./log";

export async function extractIntent(
  userPrompt: string
) {
  const prompt = `
Extract application intent.

Return ONLY valid JSON.

{
  "appName": "",
  "appType": "",
  "features": [],
  "entities": [],
  "integrations_requested": [],
  "assumptions": []
}

Prompt:
${userPrompt}
`;

  const response =
    await generateWithFallback(prompt);

  pipelineLog(
    "intent_raw_response",
    response
  );

  let parsed;

  try {
    const cleaned = response
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    pipelineLog(
      "intent_cleaned",
      cleaned
    );

    parsed = JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "JSON Parse Error:",
      error
    );

    parsed = {};
  }

  pipelineLog(
    "intent_parsed",
    parsed
  );

  const validation =
    validateIntent(parsed);

  pipelineLog(
    "intent_validation",
    validation
  );

  // Always run repair
  parsed = repairIntent(parsed);

  pipelineLog(
    "intent_repaired",
    parsed
  );

  return parsed;
}