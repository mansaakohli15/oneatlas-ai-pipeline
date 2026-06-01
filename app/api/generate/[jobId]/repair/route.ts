import { NextResponse } from "next/server";

import { jobs } from "@/lib/jobs/store";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      jobId: string;
    }>;
  }
) {
  const { jobId } =
    await params;

  const job =
    jobs.get(jobId);

  if (!job) {
    return NextResponse.json(
      {
        error:
          "Job not found",
      },
      {
        status: 404,
      }
    );
  }

  job.repairLog.push(
    "Manual repair triggered"
  );

  return NextResponse.json({
    success: true,
    repairLog:
      job.repairLog,
  });
}