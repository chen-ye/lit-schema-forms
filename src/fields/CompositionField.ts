import { html } from 'lit';
import { renderField } from './index.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';

export function renderCompositionField(
  schema: any,
  value: any,
  onChange: (val: any) => void,
  view: any = {}
) {
  // Determine if it's oneOf or anyOf
  const options = schema.oneOf || schema.anyOf;
  if (!options || !Array.isArray(options)) {
    return html`<div>Error: Invalid composition schema</div>`;
  }

  // Determine current option index
  // Simple heuristic: try to match value against schemas (hard in JS without detailed validation)
  // For now, we rely on a UI state tracking the selected index, OR we just default to 0.
  // Ideally, we persist the selected index in the formData (not standard) or separate state.
  // RJSF uses a heuristic or explicit selection.

  // Minimal approach: Let's assume we can pass `selectedOption` in view or derived state?
  // Without validation logic, it's hard to auto-detect.
  // Let's implement a simple user-selected switch.

  // We need state for "currently selected option".
  // Since renderField is pure(ish), we might need to store this in the form data?
  // No, that corrupts data.
  // We can treat it as a UI transformation.
  // For now, let's default to the first option if we can't guess.

  // IMPORTANT: We need a way to track which option is selected.
  // RJSF often does this by validating the data against each schema.

  // Let's just use a local variable for now? No, re-renders reset it.
  // We can use a property in `view` if we want to be stateless?
  // Or we can modify the component to track this?

  // Let's add a "selectedSchemaIndex" to the view if possible, or just default to 0.
  // Better: We can rely on the user to switch. But we need to know what to render.

  // Let's defer "smart detection" and just provide the switcher.
  // We'll use a `dataset` attribute or similar if we were a component, but we are a function.
  // BUT: `JsonSchemaForm.view` is stateful! We can store it there?
  // `view['__selectedOption']`?

  // Let's try to match basic types first?
  let selectedIndex = 0;

  // Use `view` to store state if permissible?
  // Alternatively, we can assume the parent tracks it. But parent is generic.

  // Let's try to infer from data if it exists.
  if (value !== undefined) {
      const match = options.findIndex((opt: any) => {
          if (opt.properties && typeof value === 'object') return true; // weak match
          if (opt.type === typeof value) return true;
          return false;
      });
      if (match >= 0) selectedIndex = match;
  }

  // We allow the user to override via the dropdown.
  // But wait, if we change the dropdown, we need to re-render.
  // Changing the dropdown should logically probably clear data or migrate it?
  // RJSF clears/defaults data when switching.

  // We need a callback to store "UI state" separate from data.
  // But our signature is `onChange(value)`.

  // Let's try to force the selection by mutating `view`?
  // Ideally we emit an event that the form handles to update view state?
  // Or simpler: The dropdown simply changes the visible "editor", which then calls `onChange` with new (default) data for that type.

  const handleOptionChange = (e: any) => {
    const newIndex = Number(e.target.value);

    // We need to trigger a re-render with the new schema active.
    // If we can't persist the state, we are stuck.
    // Hack: We can temporarily encode the choice?

    // Proper way: `JsonSchemaForm` should generic handling for UI state.
    // For this MVP, let's assume we simply render the chosen option and if the user changes data, it fits.
    // But how do we sustain the selection across re-renders (triggered by onChange)?

    // If we change the data to match the new schema's default, our auto-detection above (lines 53-60) works!
    // So: When switching, set data to default of new schema.

    const newSchema = options[newIndex];
    let newData = undefined;
    if (newSchema.properties) newData = {};
    if (newSchema.type === 'array') newData = [];
    if (newSchema.type === 'array') newData = [];
    if (newSchema.type === 'string') newData = '';
    if (newSchema.type === 'number' || newSchema.type === 'integer') newData = 0;
    if (newSchema.type === 'boolean') newData = false;
    // etc.

    onChange(newData);
  };

  const currentSchema = options[selectedIndex] || options[0];

  return html`
    <div class="composition-field" style="border: 1px dashed #ccc; padding: 1rem; border-radius: 4px;">
      <div style="margin-bottom: 1rem;">
        <label>${schema.title || 'Options'}</label>
        <wa-select
            value=${String(selectedIndex)}
            @input=${handleOptionChange} // Listen to standard input
            size="small"
        >
          ${options.map((opt: any, i: number) => html`
            <wa-option value=${String(i)}>${opt.title || `Option ${i + 1}`}</wa-option>
          `)}
        </wa-select>
        <div style="font-size: 0.8em; color: #666; margin-top: 0.25rem;">
            ${schema.description || 'Select an option to configure.'}
        </div>
      </div>

      ${renderField(
        'option-' + selectedIndex, // Dynamic key?
        currentSchema,
        value,
        onChange, // Pass through change handler
        view // Pass view
      )}
    </div>
  `;
}
