export function pipelineLog(
  stage: string,
  data: unknown
) {
  console.log(
    `[PIPELINE] ${stage}`,
    JSON.stringify(data, null, 2)
  );
}