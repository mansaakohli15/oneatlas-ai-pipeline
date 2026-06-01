import { jobs } from "@/lib/jobs/store";

import { extractIntent } from "./intent";
import { generateSchema } from "./schema";
import { generateAppSpec } from "./appspec";

import { validateSchema } from "@/lib/validation/schema";
import { validateAppSpec } from "@/lib/validation/appspec";

import { repairConsistency } from "@/lib/repair/consistency";

export async function runPipeline(
  jobId: string
) {
  const job = jobs.get(jobId);

  if (!job) return;

  const start = Date.now();

  try {
    job.status = "running";

    // ------------------------
    // INTENT
    // ------------------------

    job.events.push({
      stage: "intent",
      status: "running",
      timestamp: Date.now(),
    });

    const intent = await extractIntent(
      job.prompt
    );

    job.repairLog.push(
      "Intent extracted"
    );

    job.events.push({
      stage: "intent",
      status: "completed",
      timestamp: Date.now(),
      data: intent,
    });

    // ------------------------
    // SCHEMA
    // ------------------------

    job.events.push({
      stage: "schema",
      status: "running",
      timestamp: Date.now(),
    });

    const schema =
      generateSchema(intent);

    const schemaValidation =
      validateSchema(schema);

    if (!schemaValidation.valid) {
      job.repairLog.push(
        `Schema validation failed: ${schemaValidation.errors.join(
          ", "
        )}`
      );

      throw new Error(
        schemaValidation.errors.join(
          ", "
        )
      );
    }

    job.repairLog.push(
      "Schema validated"
    );

    job.events.push({
      stage: "schema",
      status: "completed",
      timestamp: Date.now(),
      data: schema,
    });

    // ------------------------
    // APPSPEC
    // ------------------------

    job.events.push({
      stage: "appspec",
      status: "running",
      timestamp: Date.now(),
    });

    let appSpec =
      generateAppSpec(
        schema,
        intent
      );

    appSpec =
      repairConsistency(
        appSpec,
        schema
      );

    const appSpecValidation =
      validateAppSpec(
        appSpec,
        schema
      );

    if (!appSpecValidation.valid) {
      job.repairLog.push(
        `AppSpec validation failed: ${appSpecValidation.errors.join(
          ", "
        )}`
      );

      throw new Error(
        appSpecValidation.errors.join(
          ", "
        )
      );
    }

    job.repairLog.push(
      "AppSpec validated"
    );

    job.events.push({
      stage: "appspec",
      status: "completed",
      timestamp: Date.now(),
      data: appSpec,
    });

    // ------------------------
    // COMPLETE
    // ------------------------

    job.result = {
      intent,
      schema,
      appSpec,
    };

    job.status = "completed";

    job.costUSD = 0.0012;

    job.repairLog.push(
      `Completed in ${
        Date.now() - start
      } ms`
    );

  } catch (error) {
    job.status = "failed";

    job.error = String(error);

    job.repairLog.push(
      `Pipeline failed: ${String(
        error
      )}`
    );

    job.events.push({
      stage: "pipeline",
      status: "failed",
      timestamp: Date.now(),
      data: String(error),
    });
  }
}