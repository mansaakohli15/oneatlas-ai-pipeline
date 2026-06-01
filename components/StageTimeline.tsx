interface JobEvent {
  stage: string;
  status: string;
  timestamp: number;
  data?: unknown;
}

interface Props {
  events: JobEvent[];
}

export default function StageTimeline({
  events,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border p-6">
      <h3 className="font-bold text-xl mb-4">
        Pipeline Stages
      </h3>

      <div className="space-y-3">
        {events.map(
          (event, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2"
            >
              <span>
                {event.stage}
              </span>

              <span>
                {event.status}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}