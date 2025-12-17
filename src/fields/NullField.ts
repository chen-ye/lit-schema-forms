import { css, html } from 'lit';
import type { JSONSchema } from '../types.js';

export const nullFieldStyles = css`
  .null-field {
    color: var(--wa-color-text-quiet);
    margin-bottom: 1rem;
  }
`;

export function renderNullField(schema: JSONSchema) {
  return html`
    <div class="null-field">
       ${schema.title || 'Null field'}
    </div>
  `;
}
