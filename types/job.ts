export interface JobEvent {
  stage: string;
  status: string;
  timestamp: number;
  data?: unknown;
}

export interface Job {
  id: string;

  status:
    | "queued"
    | "running"
    | "completed"
    | "failed";

  prompt: string;

  result?: any;

  error?: string;

  events: JobEvent[];

  costUSD?: number;

  repairLog: string[];

  createdAt: number;
}