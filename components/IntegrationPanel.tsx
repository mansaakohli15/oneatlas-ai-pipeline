interface Props {
  hooks: any[];
}

export default function IntegrationPanel({
  hooks,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border p-6">
      <h3 className="text-xl font-bold mb-4">
        Integrations
      </h3>

      <div className="space-y-3">
        {hooks.map((hook, index) => (
          <div
            key={index}
            className="border rounded-xl p-3"
          >
            <div className="font-medium">
              {hook.integrationId}
            </div>

            <div className="text-sm text-gray-500">
              {hook.trigger}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}