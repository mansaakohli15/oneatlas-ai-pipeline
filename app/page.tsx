"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [job, setJob] =
    useState<any>(null);

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );

      const { jobId } =
        await res.json();

      const interval =
        setInterval(async () => {
          const statusRes =
            await fetch(
              `/api/generate/${jobId}`
            );

          const status =
            await statusRes.json();

          setJob(status);

          if (
            status.status ===
              "completed" ||
            status.status ===
              "failed"
          ) {
            clearInterval(
              interval
            );

            setLoading(false);
          }
        }, 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0F172A] text-white">

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER */}

        <div className="mb-10">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-5xl font-bold">
                OneAtlas
              </h1>

              <p className="text-slate-400 mt-3">
                AI Native App
                Generation Platform
              </p>

            </div>

            <div className="text-right">

              <div className="text-slate-400 text-sm">
                Pipeline Status
              </div>

              <div className="font-semibold">
                {job?.status ??
                  "Idle"}
              </div>

            </div>

          </div>

        </div>

        {/* INPUT */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(
                e.target.value
              )
            }
            placeholder="Build a CRM for a real estate agency..."
            className="w-full h-40 bg-slate-950 border border-slate-800 rounded-2xl p-4 resize-none outline-none"
          />

          <button
            onClick={generate}
            disabled={loading}
            className="mt-4 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Generating..."
              : "Generate AppSpec"}
          </button>

        </div>

        {/* STATS */}

        {job?.result && (

          <>

            <div className="grid md:grid-cols-4 gap-5 mt-8">

              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
                <div className="text-slate-400 text-sm">
                  Entities
                </div>

                <div className="text-3xl font-bold mt-2">
                  {
                    job.result.schema
                      .entities
                      .length
                  }
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
                <div className="text-slate-400 text-sm">
                  Pages
                </div>

                <div className="text-3xl font-bold mt-2">
                  {
                    job.result
                      .appSpec.pages
                      .length
                  }
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
                <div className="text-slate-400 text-sm">
                  APIs
                </div>

                <div className="text-3xl font-bold mt-2">
                  {
                    job.result
                      .appSpec
                      .apiEndpoints
                      .length
                  }
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
                <div className="text-slate-400 text-sm">
                  Cost
                </div>

                <div className="text-3xl font-bold mt-2">
                  $
                  {job.costUSD ??
                    0}
                </div>
              </div>

            </div>

            {/* APP INFO */}

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 mt-8">

              <h2 className="text-3xl font-bold">
                {
                  job.result.intent
                    .appName
                }
              </h2>

              <p className="text-slate-400 mt-2">
                {
                  job.result.intent
                    .appType
                }
              </p>

            </div>

            {/* FEATURES + ENTITIES */}

            <div className="grid md:grid-cols-2 gap-6 mt-8">

              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">

                <h3 className="text-xl font-bold mb-4">
                  Features
                </h3>

                <ul className="space-y-3">
                  {job.result.intent.features.map(
                    (
                      feature: string
                    ) => (
                      <li
                        key={
                          feature
                        }
                      >
                        •{" "}
                        {feature}
                      </li>
                    )
                  )}
                </ul>

              </div>

              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">

                <h3 className="text-xl font-bold mb-4">
                  Entities
                </h3>

                <ul className="space-y-3">
                  {job.result.schema.entities.map(
                    (
                      entity: any
                    ) => (
                      <li
                        key={
                          entity.name
                        }
                      >
                        📦{" "}
                        {
                          entity.name
                        }
                      </li>
                    )
                  )}
                </ul>

              </div>

            </div>

            {/* API TABLE */}

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 mt-8">

              <h3 className="text-xl font-bold mb-4">
                API Endpoints
              </h3>

              <div className="space-y-3">

                {job.result.appSpec.apiEndpoints.map(
                  (
                    api: any
                  ) => (
                    <div
                      key={
                        api.path
                      }
                      className="bg-slate-950 border border-slate-800 rounded-xl p-4"
                    >
                      <span className="text-indigo-400 font-semibold">
                        {
                          api.method
                        }
                      </span>

                      {"  "}

                      {api.path}
                    </div>
                  )
                )}

              </div>

            </div>

            {/* WORKFLOWS */}

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 mt-8">

              <h3 className="text-xl font-bold mb-4">
                Workflow Stubs
              </h3>

              <div className="space-y-4">

                {job.result.appSpec.workflowStubs.map(
                  (
                    workflow: any
                  ) => (
                    <div
                      key={
                        workflow.name
                      }
                      className="bg-slate-950 border border-slate-800 rounded-xl p-4"
                    >
                      <div className="font-semibold">
                        {
                          workflow.name
                        }
                      </div>

                      <div className="text-slate-400 text-sm mt-1">
                        {
                          workflow.trigger
                            .entity
                        }

                        {" → "}

                        {
                          workflow.integration
                        }
                      </div>
                    </div>
                  )
                )}

              </div>

            </div>

            {/* REPAIR LOG */}

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 mt-8">

              <h3 className="text-xl font-bold mb-4">
                Repair Log
              </h3>

              <div className="space-y-2">

                {job.repairLog?.map(
                  (
                    log: string,
                    idx: number
                  ) => (
                    <div
                      key={idx}
                      className="text-slate-300"
                    >
                      • {log}
                    </div>
                  )
                )}

              </div>

            </div>

          </>

        )}

      </div>

    </main>
  );
}