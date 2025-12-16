import { css, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { renderField } from './fields/index.js';
import type { JSONSchema, UISchema } from './types.js';

@customElement('wa-json-schema-form')
export class JsonSchemaForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--wa-font-sans, sans-serif);
    }
  `;

  @property({ type: Object }) accessor schema: JSONSchema = {};
  @property({ type: Object }) accessor view: UISchema = {};
  @property({ type: Object }) accessor data: Record<string, unknown> = {};

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
    this.requestUpdate();
  }

  private renderFields() {
    if (!this.schema) {
      return html`<p>No schema defined</p>`;
    }

    // Treat the entire form as a single root field
    return renderField('', this.schema, this.data, (key, val) => this.handleFieldChange(key, val), this.view || {});
  }

  render() {
    return html`
      <form @submit=${(e: Event) => e.preventDefault()}>
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
