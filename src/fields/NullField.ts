import { html } from 'lit';

export function renderNullField(schema: any) {
  return html`
    <div class="null-field" style="color: #666; margin-bottom: 1rem;">
       ${schema.title || 'Null field'}
    </div>
  `;
}
