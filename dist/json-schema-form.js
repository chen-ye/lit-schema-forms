var __esDecorate =
  (this && this.__esDecorate) ||
  ((ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) => {
    function accept(f) {
      if (f !== void 0 && typeof f !== 'function') throw new TypeError('Function expected');
      return f;
    }
    var kind = contextIn.kind,
      key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
    var target = !descriptorIn && ctor ? (contextIn['static'] ? ctor : ctor.prototype) : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = (f) => {
        if (done) throw new TypeError('Cannot add initializers after decoration has completed');
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === 'accessor' ? { get: descriptor.get, set: descriptor.set } : descriptor[key],
        context,
      );
      if (kind === 'accessor') {
        if (result === void 0) continue;
        if (result === null || typeof result !== 'object') throw new TypeError('Object expected');
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.unshift(_);
      } else if ((_ = accept(result))) {
        if (kind === 'field') initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  });
var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };

import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  arrayFieldStyles,
  compositionFieldStyles,
  fileFieldStyles,
  nullFieldStyles,
  objectFieldStyles,
  renderField,
} from './fields/index.js';
import { createValidator } from './utils/validator.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';
const JsonSchemaForm = (() => {
  const _classDecorators = [customElement('wa-json-schema-form')];
  let _classDescriptor;
  const _classExtraInitializers = [];
  let _classThis;
  const _classSuper = LitElement;
  let _schema_decorators;
  const _schema_initializers = [];
  const _schema_extraInitializers = [];
  let _view_decorators;
  const _view_initializers = [];
  const _view_extraInitializers = [];
  let _data_decorators;
  const _data_initializers = [];
  const _data_extraInitializers = [];
  let _widgets_decorators;
  const _widgets_initializers = [];
  const _widgets_extraInitializers = [];
  let _validationErrors_decorators;
  const _validationErrors_initializers = [];
  const _validationErrors_extraInitializers = [];
  var JsonSchemaForm = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata =
        typeof Symbol === 'function' && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _schema_decorators = [property({ type: Object })];
      _view_decorators = [property({ type: Object })];
      _data_decorators = [property({ type: Object })];
      _widgets_decorators = [property({ type: Object })];
      _validationErrors_decorators = [state()];
      __esDecorate(
        this,
        null,
        _schema_decorators,
        {
          kind: 'accessor',
          name: 'schema',
          static: false,
          private: false,
          access: {
            has: (obj) => 'schema' in obj,
            get: (obj) => obj.schema,
            set: (obj, value) => {
              obj.schema = value;
            },
          },
          metadata: _metadata,
        },
        _schema_initializers,
        _schema_extraInitializers,
      );
      __esDecorate(
        this,
        null,
        _view_decorators,
        {
          kind: 'accessor',
          name: 'view',
          static: false,
          private: false,
          access: {
            has: (obj) => 'view' in obj,
            get: (obj) => obj.view,
            set: (obj, value) => {
              obj.view = value;
            },
          },
          metadata: _metadata,
        },
        _view_initializers,
        _view_extraInitializers,
      );
      __esDecorate(
        this,
        null,
        _data_decorators,
        {
          kind: 'accessor',
          name: 'data',
          static: false,
          private: false,
          access: {
            has: (obj) => 'data' in obj,
            get: (obj) => obj.data,
            set: (obj, value) => {
              obj.data = value;
            },
          },
          metadata: _metadata,
        },
        _data_initializers,
        _data_extraInitializers,
      );
      __esDecorate(
        this,
        null,
        _widgets_decorators,
        {
          kind: 'accessor',
          name: 'widgets',
          static: false,
          private: false,
          access: {
            has: (obj) => 'widgets' in obj,
            get: (obj) => obj.widgets,
            set: (obj, value) => {
              obj.widgets = value;
            },
          },
          metadata: _metadata,
        },
        _widgets_initializers,
        _widgets_extraInitializers,
      );
      __esDecorate(
        this,
        null,
        _validationErrors_decorators,
        {
          kind: 'accessor',
          name: 'validationErrors',
          static: false,
          private: false,
          access: {
            has: (obj) => 'validationErrors' in obj,
            get: (obj) => obj.validationErrors,
            set: (obj, value) => {
              obj.validationErrors = value;
            },
          },
          metadata: _metadata,
        },
        _validationErrors_initializers,
        _validationErrors_extraInitializers,
      );
      __esDecorate(
        null,
        (_classDescriptor = { value: _classThis }),
        _classDecorators,
        { kind: 'class', name: _classThis.name, metadata: _metadata },
        null,
        _classExtraInitializers,
      );
      JsonSchemaForm = _classThis = _classDescriptor.value;
      if (_metadata)
        Object.defineProperty(_classThis, Symbol.metadata, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: _metadata,
        });
    }
    static styles = [
      css`
      :host {
        display: block;
        font-family: var(--wa-font-sans, sans-serif);
      }
      wa-callout {
        margin-bottom: 1rem;
      }
    `,
      arrayFieldStyles,
      compositionFieldStyles,
      fileFieldStyles,
      nullFieldStyles,
      objectFieldStyles,
    ];
    #schema_accessor_storage = __runInitializers(this, _schema_initializers, {});
    get schema() {
      return this.#schema_accessor_storage;
    }
    set schema(value) {
      this.#schema_accessor_storage = value;
    }
    #view_accessor_storage =
      (__runInitializers(this, _schema_extraInitializers), __runInitializers(this, _view_initializers, {}));
    get view() {
      return this.#view_accessor_storage;
    }
    set view(value) {
      this.#view_accessor_storage = value;
    }
    #data_accessor_storage =
      (__runInitializers(this, _view_extraInitializers), __runInitializers(this, _data_initializers, {}));
    get data() {
      return this.#data_accessor_storage;
    }
    set data(value) {
      this.#data_accessor_storage = value;
    }
    #widgets_accessor_storage =
      (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _widgets_initializers, {}));
    get widgets() {
      return this.#widgets_accessor_storage;
    }
    set widgets(value) {
      this.#widgets_accessor_storage = value;
    }
    #validationErrors_accessor_storage =
      (__runInitializers(this, _widgets_extraInitializers),
      __runInitializers(this, _validationErrors_initializers, []));
    get validationErrors() {
      return this.#validationErrors_accessor_storage;
    }
    set validationErrors(value) {
      this.#validationErrors_accessor_storage = value;
    }
    validator = __runInitializers(this, _validationErrors_extraInitializers);
    willUpdate(changedProperties) {
      if (changedProperties.has('schema')) {
        this.validator = createValidator(this.schema);
        this.validate();
      }
      if (changedProperties.has('data')) {
        this.validate();
      }
    }
    validate() {
      if (this.validator) {
        this.validationErrors = this.validator.validate(this.data);
      } else {
        this.validationErrors = [];
      }
    }
    handleFieldChange(key, value) {
      let newData;
      if (key === '') {
        // Root update
        newData = value;
      } else {
        // Basic immutable update
        newData = { ...this.data, [key]: value };
      }
      this.data = newData;
      this.dispatchEvent(
        new CustomEvent('lsf-change', {
          detail: { data: this.data },
          bubbles: true,
          composed: true,
        }),
      );
      // Validation happens in willUpdate via data property change or we can force it here if simpler
      // But since this.data is updated, requestUpdate will trigger willUpdate
      this.requestUpdate();
    }
    renderFields() {
      if (!this.schema) {
        return html`<p>No schema defined</p>`;
      }
      // Treat the entire form as a single root field
      // Root path is empty string for consistency with Validator ("#" -> "")
      return renderField(
        '',
        this.schema,
        this.data,
        (key, val) => this.handleFieldChange(key, val),
        this.view || {},
        '', // root path
        this.validationErrors,
        this.widgets,
      );
    }
    render() {
      return html`
      <form @submit=${(e) => e.preventDefault()}>
        ${
          this.validationErrors.length > 0
            ? html`
          <wa-callout variant="danger" icon="circle-exclamation">
            <strong>Validation Errors</strong>
            <ul>
              ${this.validationErrors.map((e) => html`<li>${e.instanceLocation}: ${e.error}</li>`)}
            </ul>
          </wa-callout>
        `
            : ''
        }
        ${this.renderFields()}
      </form>
    `;
    }
    static {
      __runInitializers(_classThis, _classExtraInitializers);
    }
  };
  return (JsonSchemaForm = _classThis);
})();
export { JsonSchemaForm };
//# sourceMappingURL=json-schema-form.js.map
