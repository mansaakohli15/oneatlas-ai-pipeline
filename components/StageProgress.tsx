interface Props {
  events: any[];
}

export default function StageProgress({
  events,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-3xl border">
      <h3 className="font-bold text-xl mb-4">
        Pipeline Progress
      </h3>

      <div className="space-y-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-2"
          >
            <span>{event.stage}</span>

            <span>
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}