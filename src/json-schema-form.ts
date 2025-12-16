import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { renderField } from './fields/index.js';

@customElement('wa-json-schema-form')
export class JsonSchemaForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `;

  @property({ type: Object }) accessor schema: any = {};
  @property({ type: Object }) accessor view: any = {};
  @property({ type: Object }) accessor data: any = {};

  render() {
    return html`
      <form>
        ${this.renderFields()}
      </form>
    `;
  }

  private handleFieldChange(key: string, value: any) {
    if (key === '') {
      this.data = value;
    } else {
      this.data = { ...this.data, [key]: value };
    }

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
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-json-schema-form': JsonSchemaForm;
  }
}
