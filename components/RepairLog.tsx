interface Props {
  logs: string[];
}

export default function RepairLog({
  logs,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-3xl border">
      <h3 className="font-bold text-xl mb-4">
        Repair Log
      </h3>

      {logs.length === 0 ? (
        <p>No repairs needed</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              {log}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}