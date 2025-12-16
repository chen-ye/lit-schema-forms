import { html } from 'lit';
import type { JSONSchema } from '../types.js';

export function renderNullField(schema: JSONSchema) {
  return html`
    <div class="null-field" style="color: #666; margin-bottom: 1rem;">
       ${schema.title || 'Null field'}
    </div>
  `;
}
