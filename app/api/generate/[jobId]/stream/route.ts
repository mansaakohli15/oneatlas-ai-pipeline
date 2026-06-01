import { jobs } from "@/lib/jobs/store";

export async function GET(
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

  const stream =
    new ReadableStream({
      start(controller) {
        let lastCount = 0;

        const interval =
          setInterval(() => {
            const job =
              jobs.get(jobId);

            if (!job) {
              controller.enqueue(
                new TextEncoder().encode(
                  `event: error\ndata: ${JSON.stringify({
                    message:
                      "Job not found",
                  })}\n\n`
                )
              );

              clearInterval(
                interval
              );

              controller.close();

              return;
            }

            const events =
              job.events.slice(
                lastCount
              );

            for (const event of events) {
              controller.enqueue(
                new TextEncoder().encode(
                  `event: ${event.status}\ndata: ${JSON.stringify(
                    event
                  )}\n\n`
                )
              );
            }

            lastCount =
              job.events.length;

            if (
              job.status ===
                "completed" ||
              job.status ===
                "failed"
            ) {
              controller.enqueue(
                new TextEncoder().encode(
                  `event: generation_complete\ndata: ${JSON.stringify(
                    job
                  )}\n\n`
                )
              );

              clearInterval(
                interval
              );

              controller.close();
            }
          }, 500);
      },
    });

  return new Response(
    stream,
    {
      headers: {
        "Content-Type":
          "text/event-stream",

        "Cache-Control":
          "no-cache",

        Connection:
          "keep-alive",
      },
    }
  );
}