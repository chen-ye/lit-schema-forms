import { html } from 'lit';
export function renderNullField(schema) {
    return html `
    <div class="null-field" style="color: #666; margin-bottom: 1rem;">
       ${schema.title || 'Null field'}
    </div>
  `;
}
//# sourceMappingURL=NullField.js.map