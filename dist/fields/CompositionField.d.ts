import { LitElement, type PropertyValues, type TemplateResult } from 'lit';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import type { ChangeHandler, JSONSchema, UISchema, WidgetRegistry } from '../types.js';
import type { ValidationError } from '../utils/validator.js';
export declare const compositionFieldStyles: import("lit").CSSResult;
export declare class LsfCompositionField extends LitElement {
    accessor schema: JSONSchema;
    accessor value: unknown;
    accessor view: UISchema;
    accessor path: string;
    accessor errors: ValidationError[];
    accessor widgets: WidgetRegistry;
    accessor onChange: ChangeHandler;
    private accessor selectedIndex;
    protected createRenderRoot(): this;
    protected willUpdate(changedProperties: PropertyValues): void;
    private syncSelectionFromData;
    private handleOptionChange;
    render(): TemplateResult<1>;
}
export declare function renderCompositionField(key: string, schema: JSONSchema, value: unknown, onChange: ChangeHandler, view?: UISchema, path?: string, errors?: ValidationError[], widgets?: WidgetRegistry): TemplateResult<1>;
