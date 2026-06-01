export interface EvaluationResult {
  prompt: string;

  success: boolean;

  stageFailed?: string;

  latencyMs: number;

  costUSD: number;

  repairCount: number;

  integrations: string[];
}