export default function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        background: "#f8fafc",
        border:
          "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "#64748b",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 4,
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}