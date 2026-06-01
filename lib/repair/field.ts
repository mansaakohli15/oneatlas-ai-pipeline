export function repairField(
  obj: any,
  field: string,
  defaultValue: any
) {
  if (
    obj[field] === undefined ||
    obj[field] === null
  ) {
    obj[field] = defaultValue;
  }

  return obj;
}