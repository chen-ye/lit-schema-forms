import { css, html } from 'lit';
export const nullFieldStyles = css `
  .null-field {
    color: var(--wa-color-text-quiet);
    margin-bottom: 1rem;
  }
`;
export function renderNullField(schema) {
    return html `
    <div class="null-field">
       ${schema.title || 'Null field'}
    </div>
  `;
}
//# sourceMappingURL=NullField.js.map