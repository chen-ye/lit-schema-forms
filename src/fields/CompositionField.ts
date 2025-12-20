import { css, html, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { renderField } from './index.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import type WaSelect from '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import type { ChangeHandler, JSONSchema, UISchema, WidgetRegistry } from '../types.js';
import type { ValidationError } from '../utils/validator.js';

export const compositionFieldStyles = css`
  .composition-field {
    border: 1px dashed var(--wa-color-neutral-border-normal);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  .composition-header {
    margin-bottom: 1rem;
  }
  .composition-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .composition-select {
    max-width: 300px;
  }
`;

@customElement('lsf-composition-field')
export class LsfCompositionField extends LitElement {
  @property({ type: Object }) accessor schema: JSONSchema = {};
  @property({ type: Object }) accessor value: unknown = undefined;
  @property({ type: Object }) accessor view: UISchema = {};
  @property({ type: String }) accessor path: string = '';
  @property({ type: Array }) accessor errors: ValidationError[] = [];
  @property({ type: Object }) accessor widgets: WidgetRegistry = {};
  @property({ attribute: false }) accessor onChange: ChangeHandler = () => {};

  @state() private accessor selectedIndex: number = 0;

  protected createRenderRoot() {
    return this; // Render in light DOM to inherit styles/form context
  }

  protected willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('value') || changedProperties.has('schema')) {
      this.syncSelectionFromData();
    }
  }

  private syncSelectionFromData() {
    const options = (this.schema.oneOf || this.schema.anyOf) as JSONSchema[];
    if (!options || !Array.isArray(options)) return;

    if (this.value === undefined) return;

    // Try to find a matching schema for the current data
    const valType = Array.isArray(this.value) ? 'array' : this.value === null ? 'null' : typeof this.value;

    let bestMatch = -1;
    let maxPropsMatch = -1;

    options.forEach((opt, index) => {
      // 1. Check strict type match (if defined)
      // If type is not defined, we assume it *could* match, but exact matches take precedence
      if (opt.type && opt.type !== valType) {
        if (opt.type === 'integer' && valType === 'number') {
          // allow
        } else {
          return; // mismatch
        }
      }

      // 2. Check property overlap (discriminator heuristic)
      if (valType === 'object' && this.value && typeof this.value === 'object' && opt.properties) {
        const valueKeys = Object.keys(this.value as object);
        const schemaKeys = Object.keys(opt.properties);
        const intersection = valueKeys.filter((k) => schemaKeys.includes(k));

        if (intersection.length > maxPropsMatch) {
          maxPropsMatch = intersection.length;
          bestMatch = index;
        }
      } else if (valType !== 'object') {
        // Primitive match
        if (bestMatch === -1) bestMatch = index;
      }
    });

    // Only override user selection if we found a matches
    if (bestMatch > -1) {
      if (valType !== 'object') {
        this.selectedIndex = bestMatch;
      } else if (maxPropsMatch > 0) {
        this.selectedIndex = bestMatch;
      }
    }
  }

  private handleOptionChange(e: Event) {
    const newIndex = Number((e.target as WaSelect).value);
    this.selectedIndex = newIndex;

    const options = (this.schema.oneOf || this.schema.anyOf) as JSONSchema[];
    const newSchema = options[newIndex];

    // Create new empty data appropriate for the schema
    let newData: unknown;
    const type = newSchema.type || 'object'; // Default to object if missing

    if (type === 'object' || newSchema.properties) newData = {};
    else if (type === 'array') newData = [];
    else if (type === 'string') newData = '';
    else if (type === 'number' || type === 'integer') newData = 0;
    else if (type === 'boolean') newData = false;
    else if (type === 'null') newData = null;

    this.onChange(newData);
  }

  render() {
    const options = (this.schema.oneOf || this.schema.anyOf) as JSONSchema[];
    if (!options || !Array.isArray(options)) {
      return html`<div style="color: red">Invalid schema: missing oneOf/anyOf options</div>`;
    }

    const currentSchema = options[this.selectedIndex] || options[0];

    return html`
      <div class="composition-field">
        <div class="composition-header">
          <label class="composition-label">${this.schema.title || 'Options'}</label>
          <wa-select
              value=${String(this.selectedIndex)}
              @input=${(e: Event) => this.handleOptionChange(e)}
              size="small"
              class="composition-select"
          >
            ${options.map(
              (opt: JSONSchema, i: number) => html`
              <wa-option value=${String(i)}>${opt.title || `Option ${i + 1}`}</wa-option>
            `,
            )}
          </wa-select>
        </div>

        ${renderField('option-' + this.selectedIndex, currentSchema, this.value, (_k, val) => this.onChange(val), this.view, this.path, this.errors, this.widgets)}
      </div>
    `;
  }
}

export function renderCompositionField(
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: ChangeHandler,
  view: UISchema = {},
  path: string = '',
  errors: ValidationError[] = [],
  widgets: WidgetRegistry = {},
) {
  return html`
    <lsf-composition-field
      .schema=${schema}
      .value=${value}
      .onChange=${onChange}
      .view=${view}
      .path=${path}
      .errors=${errors}
      .widgets=${widgets}
    ></lsf-composition-field>
  `;
}
