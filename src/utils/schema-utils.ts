export function mergeSchemas(schemas: any[]): any {
  // Simple partial recursive merge
  // This is a naive implementation. Full JSON Schema merging is complex.
  // For basic cases (merging properties), this suffices.

  return schemas.reduce((acc, schema) => {
    // Merge properties
    const mergedProps = { ...(acc.properties || {}), ...(schema.properties || {}) };
    const mergedRequired = [...(acc.required || []), ...(schema.required || [])];

    // Merge other fields (last wins)
    const result = { ...acc, ...schema };

    if (Object.keys(mergedProps).length > 0) {
        result.properties = mergedProps;
    }
    if (mergedRequired.length > 0) {
        result.required = Array.from(new Set(mergedRequired));
    }
    return result;
  }, {});
}
