interface Props {
  entity: any;
}

export default function EntityCard({
  entity,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border p-5 shadow-sm hover:shadow-md transition">

      <h3 className="font-bold text-lg mb-4">
        {entity.name}
      </h3>

      <div className="space-y-2">
        {entity.fields.map(
          (field: any) => (
            <div
              key={field.name}
              className="flex justify-between text-sm"
            >
              <span>
                {field.name}
              </span>

              <span className="text-gray-500">
                {field.type}
              </span>
            </div>
          )
        )}
      </div>

    </div>
  );
}