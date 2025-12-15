# Agent Rules for Lit Schema Form

## Technology Stack
- **Framework**: Lit (LitElement)
- **Language**: TypeScript
- **UI Component Library**: Web Awesome (@awesome.me/webawesome)
- **Build/Dev Tooling**: web-dev-server, tsc (TypeScript Compiler)

## Project Structure
- `src/`: Source code for the web component.
- `index.html`: Entry point for development and demo.
- `testdata/`: JSON files for testing and validation.

## Coding Conventions
1. **Web Components**:
   - Use the `@customElement` decorator for defining components.
   - Use the `@property` or `@state` decorators for reactive properties.
   - Component names should be prefixed (e.g., `lsf-` for Lit Schema Form) to avoid collisions, though the main component might be `json-schema-form`.
   - Use `Shadow DOM` for encapsulation.
   - Styles should be defined using `css` tagged template literal.

2. **TypeScript**:
   - Strict type checking enabled.
   - Use interfaces for Schema and View definitions.
   - Avoid `any` where possible.

3. **Web Awesome Integration**:
   - Import necessary components from `@awesome.me/webawesome`.
   - Use Web Awesome components (`wa-input`, `wa-textarea`, `wa-select`, etc.) for rendering form fields.
   - Follow Web Awesome's theming and slotting patterns.

4. **JSON Schema Handling**:
   - Support standard JSON Schema constructs (type, title, description, properties, required, etc.).
   - Support `uiSchema` (View Schema) for customizing rendering (widgets, help text, placeholders).
   - Use a modular approach for different field types (StringField, NumberField, etc.).

5. **State Management**:
   - The form component should be controlled or uncontrolled.
   - Emitting events (e.g., `change`, `submit`) with the current data.

## Workflow
- Ensure code compiles with `tsc` without errors.
- Verify changes using the local dev server (`npm start`).
