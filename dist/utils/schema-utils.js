import { createMerger } from '@x0k/json-schema-merge';
export function mergeSchemas(schemas) {
    const { mergeArrayOfSchemaDefinitions } = createMerger();
    // biome-ignore lint/suspicious/noExplicitAny: Library compatibility
    const merged = mergeArrayOfSchemaDefinitions(schemas);
    return merged;
}
//# sourceMappingURL=schema-utils.js.map