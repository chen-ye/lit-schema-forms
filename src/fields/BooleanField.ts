import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import type WaCheckbox from '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import '@awesome.me/webawesome/dist/components/switch/switch.js';
import type WaSwitch from '@awesome.me/webawesome/dist/components/switch/switch.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';

export function renderBooleanField(schema: JSONSchema, value: unknown, onChange: ChangeHandler, view: UISchema = {}) {
  const isSwitch = view['ui:widget'] === 'switch';

  if (isSwitch) {
    return html`
      <wa-switch
        ?checked=${!!value}
        help-text=${(view['ui:help'] as string) || ''}
        @wa-change=${(e: Event) => onChange((e.target as WaSwitch).checked)}
      >
        ${schema.title || ''}
      </wa-switch>
    `;
  }

  // Use checkbox by default
  return html`
    <wa-checkbox
      ?checked=${!!value}
      help-text=${(view['ui:help'] as string) || ''}
      @wa-change=${(e: Event) => onChange((e.target as WaCheckbox).checked)}
    >
      ${schema.title || ''}
    </wa-checkbox>
  `;
}
