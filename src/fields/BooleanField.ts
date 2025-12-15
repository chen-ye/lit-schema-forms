import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import '@awesome.me/webawesome/dist/components/switch/switch.js';

export function renderBooleanField(schema: any, value: boolean, onChange: (val: boolean) => void, view: any = {}) {
  const isSwitch = view && view['ui:widget'] === 'switch';

  if (isSwitch) {
    return html`
      <wa-switch
        ?checked=${!!value}
        @wa-change=${(e: any) => onChange(e.target.checked)}
      >
        ${schema.title || ''}
      </wa-switch>
    `;
  }

  return html`
    <wa-checkbox
      ?checked=${!!value}
      @wa-change=${(e: any) => onChange(e.target.checked)}
    >
      ${schema.title || ''}
    </wa-checkbox>
  `;
}
