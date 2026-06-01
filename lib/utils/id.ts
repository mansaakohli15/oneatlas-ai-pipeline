export function createJobId() {
  return (
    "job_" +
    Math.random()
      .toString(36)
      .slice(2)
  );
}