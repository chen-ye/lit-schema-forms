import { css, html, LitElement, type PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  arrayFieldStyles,
  compositionFieldStyles,
  fileFieldStyles,
  nullFieldStyles,
  objectFieldStyles,
  renderField,
} from './fields/index.js';
import type { JSONSchema, UISchema, WidgetRegistry } from './types.js';
import { createValidator, type SchemaValidator, type ValidationError } from './utils/validator.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';

@customElement('wa-json-schema-form')
export class JsonSchemaForm extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: var(--wa-font-sans, sans-serif);
      }
      wa-callout {
        margin-bottom: 1rem;
      }
    `,
    arrayFieldStyles,
    compositionFieldStyles,
    fileFieldStyles,
    nullFieldStyles,
    objectFieldStyles,
  ];

  @property({ type: Object }) accessor schema: JSONSchema = {};
  @property({ type: Object }) accessor view: UISchema = {};
  @property({ type: Object }) accessor data: Record<string, unknown> = {};
  @property({ type: Object }) accessor widgets: WidgetRegistry = {};

  @state() private accessor validationErrors: ValidationError[] = [];

  private validator?: SchemaValidator;

  protected willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('schema')) {
      this.validator = createValidator(this.schema);
      this.validate();
    }
    if (changedProperties.has('data')) {
      this.validate();
    }
  }

  private validate() {
    if (this.validator) {
      this.validationErrors = this.validator.validate(this.data);
    } else {
      this.validationErrors = [];
    }
  }

  private handleFieldChange(key: string, value: unknown) {
    let newData: Record<string, unknown>;
    if (key === '') {
      // Root update
      newData = value as Record<string, unknown>;
    } else {
      // Basic immutable update
      newData = { ...this.data, [key]: value };
    }
    this.data = newData;

    this.dispatchEvent(
      new CustomEvent('lsf-change', {
        detail: { data: this.data },
        bubbles: true,
        composed: true,
      }),
    );
    // Validation happens in willUpdate via data property change or we can force it here if simpler
    // But since this.data is updated, requestUpdate will trigger willUpdate
    this.requestUpdate();
  }

  private renderFields() {
    if (!this.schema) {
      return html`<p>No schema defined</p>`;
    }

    // Treat the entire form as a single root field
    // Root path is empty string for consistency with Validator ("#" -> "")
    return renderField(
      '',
      this.schema,
      this.data,
      (key, val) => this.handleFieldChange(key, val),
      this.view || {},
      '', // root path
      this.validationErrors,
      this.widgets,
    );
  }

  render() {
    return html`
      <form @submit=${(e: Event) => e.preventDefault()}>
        ${
          this.validationErrors.length > 0
            ? html`
          <wa-callout variant="danger" icon="circle-exclamation">
            <strong>Validation Errors</strong>
            <ul>
              ${this.validationErrors.map((e) => html`<li>${e.instanceLocation}: ${e.error}</li>`)}
            </ul>
          </wa-callout>
        `
            : ''
        }
        ${this.renderFields()}
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-json-schema-form': JsonSchemaForm;
  }
}
