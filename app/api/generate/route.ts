import { NextResponse } from "next/server";

import { jobs } from "@/lib/jobs/store";

import { createJobId } from "@/lib/utils/id";

import { runPipeline } from "@/lib/pipeline/run";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const prompt =
      body.prompt ?? "";

    const jobId =
      createJobId();

    jobs.set(jobId, {
      id: jobId,

      status: "queued",

      prompt,

      events: [],

      repairLog: [],

      createdAt:
        Date.now(),

      costUSD: 0,
    });

    runPipeline(jobId).catch(
      console.error
    );

    return NextResponse.json({
      success: true,
      jobId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}