var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { renderField } from './index.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
let LsfCompositionField = (() => {
    let _classDecorators = [customElement('lsf-composition-field')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = LitElement;
    let _schema_decorators;
    let _schema_initializers = [];
    let _schema_extraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _view_decorators;
    let _view_initializers = [];
    let _view_extraInitializers = [];
    let _path_decorators;
    let _path_initializers = [];
    let _path_extraInitializers = [];
    let _errors_decorators;
    let _errors_initializers = [];
    let _errors_extraInitializers = [];
    let _widgets_decorators;
    let _widgets_initializers = [];
    let _widgets_extraInitializers = [];
    let _onChange_decorators;
    let _onChange_initializers = [];
    let _onChange_extraInitializers = [];
    let _selectedIndex_decorators;
    let _selectedIndex_initializers = [];
    let _selectedIndex_extraInitializers = [];
    var LsfCompositionField = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _schema_decorators = [property({ type: Object })];
            _value_decorators = [property({ type: Object })];
            _view_decorators = [property({ type: Object })];
            _path_decorators = [property({ type: String })];
            _errors_decorators = [property({ type: Array })];
            _widgets_decorators = [property({ type: Object })];
            _onChange_decorators = [property({ attribute: false })];
            _selectedIndex_decorators = [state()];
            __esDecorate(this, null, _schema_decorators, { kind: "accessor", name: "schema", static: false, private: false, access: { has: obj => "schema" in obj, get: obj => obj.schema, set: (obj, value) => { obj.schema = value; } }, metadata: _metadata }, _schema_initializers, _schema_extraInitializers);
            __esDecorate(this, null, _value_decorators, { kind: "accessor", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
            __esDecorate(this, null, _view_decorators, { kind: "accessor", name: "view", static: false, private: false, access: { has: obj => "view" in obj, get: obj => obj.view, set: (obj, value) => { obj.view = value; } }, metadata: _metadata }, _view_initializers, _view_extraInitializers);
            __esDecorate(this, null, _path_decorators, { kind: "accessor", name: "path", static: false, private: false, access: { has: obj => "path" in obj, get: obj => obj.path, set: (obj, value) => { obj.path = value; } }, metadata: _metadata }, _path_initializers, _path_extraInitializers);
            __esDecorate(this, null, _errors_decorators, { kind: "accessor", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors, set: (obj, value) => { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
            __esDecorate(this, null, _widgets_decorators, { kind: "accessor", name: "widgets", static: false, private: false, access: { has: obj => "widgets" in obj, get: obj => obj.widgets, set: (obj, value) => { obj.widgets = value; } }, metadata: _metadata }, _widgets_initializers, _widgets_extraInitializers);
            __esDecorate(this, null, _onChange_decorators, { kind: "accessor", name: "onChange", static: false, private: false, access: { has: obj => "onChange" in obj, get: obj => obj.onChange, set: (obj, value) => { obj.onChange = value; } }, metadata: _metadata }, _onChange_initializers, _onChange_extraInitializers);
            __esDecorate(this, null, _selectedIndex_decorators, { kind: "accessor", name: "selectedIndex", static: false, private: false, access: { has: obj => "selectedIndex" in obj, get: obj => obj.selectedIndex, set: (obj, value) => { obj.selectedIndex = value; } }, metadata: _metadata }, _selectedIndex_initializers, _selectedIndex_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LsfCompositionField = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        #schema_accessor_storage = __runInitializers(this, _schema_initializers, {});
        get schema() { return this.#schema_accessor_storage; }
        set schema(value) { this.#schema_accessor_storage = value; }
        #value_accessor_storage = (__runInitializers(this, _schema_extraInitializers), __runInitializers(this, _value_initializers, undefined));
        get value() { return this.#value_accessor_storage; }
        set value(value) { this.#value_accessor_storage = value; }
        #view_accessor_storage = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _view_initializers, {}));
        get view() { return this.#view_accessor_storage; }
        set view(value) { this.#view_accessor_storage = value; }
        #path_accessor_storage = (__runInitializers(this, _view_extraInitializers), __runInitializers(this, _path_initializers, ''));
        get path() { return this.#path_accessor_storage; }
        set path(value) { this.#path_accessor_storage = value; }
        #errors_accessor_storage = (__runInitializers(this, _path_extraInitializers), __runInitializers(this, _errors_initializers, []));
        get errors() { return this.#errors_accessor_storage; }
        set errors(value) { this.#errors_accessor_storage = value; }
        #widgets_accessor_storage = (__runInitializers(this, _errors_extraInitializers), __runInitializers(this, _widgets_initializers, {}));
        get widgets() { return this.#widgets_accessor_storage; }
        set widgets(value) { this.#widgets_accessor_storage = value; }
        #onChange_accessor_storage = (__runInitializers(this, _widgets_extraInitializers), __runInitializers(this, _onChange_initializers, () => { }));
        get onChange() { return this.#onChange_accessor_storage; }
        set onChange(value) { this.#onChange_accessor_storage = value; }
        #selectedIndex_accessor_storage = (__runInitializers(this, _onChange_extraInitializers), __runInitializers(this, _selectedIndex_initializers, 0));
        get selectedIndex() { return this.#selectedIndex_accessor_storage; }
        set selectedIndex(value) { this.#selectedIndex_accessor_storage = value; }
        // ... rest of class ...
        createRenderRoot() {
            return this; // Render in light DOM to inherit styles/form context
        }
        willUpdate(changedProperties) {
            if (changedProperties.has('value') || changedProperties.has('schema')) {
                this.syncSelectionFromData();
            }
        }
        syncSelectionFromData() {
            const options = (this.schema.oneOf || this.schema.anyOf);
            if (!options || !Array.isArray(options))
                return;
            if (this.value === undefined)
                return;
            // Try to find a matching schema for the current data
            const valType = Array.isArray(this.value) ? 'array' : this.value === null ? 'null' : typeof this.value;
            let bestMatch = -1;
            let maxPropsMatch = -1;
            options.forEach((opt, index) => {
                // 1. Check strict type match (if defined)
                // If type is not defined, we assume it *could* match, but exact matches take precedence
                if (opt.type && opt.type !== valType) {
                    if (opt.type === 'integer' && valType === 'number') {
                        // allow
                    }
                    else {
                        return; // mismatch
                    }
                }
                // 2. Check property overlap (discriminator heuristic)
                if (valType === 'object' && this.value && typeof this.value === 'object' && opt.properties) {
                    const valueKeys = Object.keys(this.value);
                    const schemaKeys = Object.keys(opt.properties);
                    const intersection = valueKeys.filter(k => schemaKeys.includes(k));
                    if (intersection.length > maxPropsMatch) {
                        maxPropsMatch = intersection.length;
                        bestMatch = index;
                    }
                }
                else if (valType !== 'object') {
                    // Primitive match
                    if (bestMatch === -1)
                        bestMatch = index;
                }
            });
            // Only override user selection if we found a matches
            if (bestMatch > -1) {
                if (valType !== 'object') {
                    this.selectedIndex = bestMatch;
                }
                else if (maxPropsMatch > 0) {
                    this.selectedIndex = bestMatch;
                }
            }
        }
        handleOptionChange(e) {
            const newIndex = Number(e.target.value);
            this.selectedIndex = newIndex;
            const options = (this.schema.oneOf || this.schema.anyOf);
            const newSchema = options[newIndex];
            // Create new empty data appropriate for the schema
            let newData;
            const type = newSchema.type || 'object'; // Default to object if missing
            if (type === 'object' || newSchema.properties)
                newData = {};
            else if (type === 'array')
                newData = [];
            else if (type === 'string')
                newData = '';
            else if (type === 'number' || type === 'integer')
                newData = 0;
            else if (type === 'boolean')
                newData = false;
            else if (type === 'null')
                newData = null;
            this.onChange(newData);
        }
        render() {
            const options = (this.schema.oneOf || this.schema.anyOf);
            if (!options || !Array.isArray(options)) {
                return html `<div style="color: red">Invalid schema: missing oneOf/anyOf options</div>`;
            }
            const currentSchema = options[this.selectedIndex] || options[0];
            return html `
      <div class="composition-field" style="border: 1px dashed #ccc; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
        <div style="margin-bottom: 1rem;">
          <label style="display:block; margin-bottom: 0.5rem; font-weight: bold;">${this.schema.title || 'Options'}</label>
          <wa-select
              value=${String(this.selectedIndex)}
              @input=${(e) => this.handleOptionChange(e)}
              size="small"
              style="max-width: 300px;"
          >
            ${options.map((opt, i) => html `
              <wa-option value=${String(i)}>${opt.title || `Option ${i + 1}`}</wa-option>
            `)}
          </wa-select>
        </div>

        ${renderField('option-' + this.selectedIndex, currentSchema, this.value, (_k, val) => this.onChange(val), this.view, this.path, this.errors, this.widgets)}
      </div>
    `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _selectedIndex_extraInitializers);
        }
    };
    return LsfCompositionField = _classThis;
})();
export { LsfCompositionField };
export function renderCompositionField(key, schema, value, onChange, view = {}, path = '', errors = [], widgets = {}) {
    return html `
    <lsf-composition-field
      .schema=${schema}
      .value=${value}
      .onChange=${onChange}
      .view=${view}
      .path=${path}
      .errors=${errors}
      .widgets=${widgets}
    ></lsf-composition-field>
  `;
}
//# sourceMappingURL=CompositionField.js.map