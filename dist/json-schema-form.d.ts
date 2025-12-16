import { LitElement, type PropertyValues, TemplateResult } from 'lit';
import type { JSONSchema, UISchema, WidgetRegistry } from './types.js';
export declare class JsonSchemaForm extends LitElement {
    static styles: import("lit").CSSResult;
    accessor schema: JSONSchema;
    accessor view: UISchema;
    accessor data: Record<string, unknown>;
    accessor widgets: WidgetRegistry;
    private accessor validationErrors;
    private validator?;
    protected willUpdate(changedProperties: PropertyValues): void;
    private validate;
    private handleFieldChange;
    private renderFields;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-json-schema-form': JsonSchemaForm;
    }
}
