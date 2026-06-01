export default function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 24,
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
        marginBottom: 20,
      }}
    >
      <h2
        style={{
          marginBottom: 16,
          color: "#0f172a",
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}