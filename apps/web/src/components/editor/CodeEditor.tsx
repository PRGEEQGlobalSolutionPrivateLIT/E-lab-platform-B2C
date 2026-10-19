'use client';

import Editor, {
  type OnMount,
} from '@monaco-editor/react';

import styles from './editor.module.css';

/* =========================================================
   PROPS
========================================================= */

type CodeEditorProps = {
  value: string;

  language: string;

  onChange: (
    value: string,
  ) => void;

  readOnly?: boolean;
};

/* =========================================================
   MONACO LANGUAGE MAPPING
========================================================= */

function getMonacoLanguage(
  language: string,
) {
  const languages: Record<
    string,
    string
  > = {
    c: 'c',

    cpp: 'cpp',

    csharp: 'csharp',

    java: 'java',

    python: 'python',

    javascript:
      'javascript',

    typescript:
      'typescript',

    go: 'go',

    php: 'php',

    html: 'html',

    css: 'css',

    sql: 'sql',

    json: 'json',
  };

  return (
    languages[language] ??
    'plaintext'
  );
}

/* =========================================================
   ANGULAR MONACO TYPE DECLARATIONS

   Monaco runs inside the browser and does not have access
   to the Angular packages installed inside Judge Docker.

   These declarations provide editor IntelliSense and stop
   false "Cannot find module '@angular/core'" diagnostics.

   They do NOT execute Angular and do NOT affect the Judge.
========================================================= */

const ANGULAR_CORE_TYPES = `
declare module '@angular/core' {
  export interface Type<T> extends Function {
    new (...args: any[]): T;
  }

  export interface ComponentMetadata {
    selector?: string;
    standalone?: boolean;
    imports?: any[];
    template?: string;
    templateUrl?: string;
    styles?: string[];
    styleUrl?: string;
    styleUrls?: string[];
    providers?: any[];
    changeDetection?: any;
  }

  export interface DirectiveMetadata {
    selector?: string;
    standalone?: boolean;
    inputs?: string[];
    outputs?: string[];
    providers?: any[];
  }

  export interface InjectableMetadata {
    providedIn?:
      | 'root'
      | 'platform'
      | 'any'
      | null;
  }

  export function Component(
    metadata: ComponentMetadata,
  ): ClassDecorator;

  export function Directive(
    metadata: DirectiveMetadata,
  ): ClassDecorator;

  export function Injectable(
    metadata?: InjectableMetadata,
  ): ClassDecorator;

  export function Pipe(
    metadata: {
      name: string;
      standalone?: boolean;
      pure?: boolean;
    },
  ): ClassDecorator;

  export function Input(
    alias?: string,
  ): PropertyDecorator;

  export function Output(
    alias?: string,
  ): PropertyDecorator;

  export function ViewChild(
    selector: any,
    options?: any,
  ): PropertyDecorator;

  export function ViewChildren(
    selector: any,
    options?: any,
  ): PropertyDecorator;

  export function ContentChild(
    selector: any,
    options?: any,
  ): PropertyDecorator;

  export function ContentChildren(
    selector: any,
    options?: any,
  ): PropertyDecorator;

  export function HostBinding(
    hostPropertyName?: string,
  ): PropertyDecorator;

  export function HostListener(
    eventName?: string,
    args?: string[],
  ): MethodDecorator;

  export class EventEmitter<T = any> {
    constructor(
      isAsync?: boolean,
    );

    emit(
      value?: T,
    ): void;

    subscribe(
      observerOrNext?: any,
      error?: any,
      complete?: any,
    ): any;
  }

  export interface OnInit {
    ngOnInit(): void;
  }

  export interface OnDestroy {
    ngOnDestroy(): void;
  }

  export interface OnChanges {
    ngOnChanges(
      changes: any,
    ): void;
  }

  export interface AfterViewInit {
    ngAfterViewInit(): void;
  }

  export interface AfterContentInit {
    ngAfterContentInit(): void;
  }

  export interface SimpleChange {
    previousValue: any;
    currentValue: any;
    firstChange: boolean;

    isFirstChange(): boolean;
  }

  export interface SimpleChanges {
    [propertyName: string]:
      SimpleChange;
  }

  export interface Signal<T> {
    (): T;
  }

  export interface WritableSignal<T>
    extends Signal<T> {
    set(
      value: T,
    ): void;

    update(
      updater:
        (
          value: T,
        ) => T,
    ): void;

    asReadonly():
      Signal<T>;
  }

  export function signal<T>(
    initialValue: T,
  ): WritableSignal<T>;

  export function computed<T>(
    computation:
      () => T,
  ): Signal<T>;

  export function effect(
    effectFn:
      () => void,
  ): any;

  export function inject<T>(
    token: any,
  ): T;

  export enum ChangeDetectionStrategy {
    OnPush = 0,
    Default = 1,
  }

  export class ElementRef<
    T = any
  > {
    nativeElement: T;
  }

  export class QueryList<T> {
    readonly length: number;
    readonly first: T;
    readonly last: T;

    toArray(): T[];

    forEach(
      fn:
        (
          item: T,
          index: number,
        ) => void,
    ): void;
  }
}
`;

const ANGULAR_COMMON_TYPES = `
declare module '@angular/common' {
  export class CommonModule {}

  export class NgIf {}

  export class NgForOf<T> {}

  export class NgClass {}

  export class NgStyle {}

  export class AsyncPipe {}

  export class DatePipe {}

  export class DecimalPipe {}

  export class CurrencyPipe {}

  export class PercentPipe {}

  export class JsonPipe {}

  export class UpperCasePipe {}

  export class LowerCasePipe {}

  export class TitleCasePipe {}

  export class SlicePipe {}
}
`;

const ANGULAR_FORMS_TYPES = `
declare module '@angular/forms' {
  export class FormsModule {}

  export class ReactiveFormsModule {}

  export class FormControl<
    T = any
  > {
    constructor(
      formState?: T,
      validatorOrOpts?: any,
      asyncValidator?: any,
    );

    value: T;

    setValue(
      value: T,
      options?: any,
    ): void;

    patchValue(
      value: T,
      options?: any,
    ): void;

    reset(
      value?: T,
      options?: any,
    ): void;
  }

  export class FormGroup<
    TControl extends
      Record<string, any> =
      any
  > {
    constructor(
      controls: TControl,
    );

    controls: TControl;

    value: any;

    valid: boolean;

    invalid: boolean;

    get(
      path: string,
    ): any;

    setValue(
      value: any,
      options?: any,
    ): void;

    patchValue(
      value: any,
      options?: any,
    ): void;

    reset(
      value?: any,
      options?: any,
    ): void;
  }

  export class FormArray<
    TControl = any
  > {
    constructor(
      controls: TControl[],
    );

    controls: TControl[];

    readonly length: number;

    at(
      index: number,
    ): TControl;

    push(
      control: TControl,
    ): void;

    removeAt(
      index: number,
    ): void;
  }

  export class Validators {
    static required:
      any;

    static requiredTrue:
      any;

    static email:
      any;

    static min(
      min: number,
    ): any;

    static max(
      max: number,
    ): any;

    static minLength(
      minLength: number,
    ): any;

    static maxLength(
      maxLength: number,
    ): any;

    static pattern(
      pattern:
        string |
        RegExp,
    ): any;
  }

  export class FormBuilder {
    group(
      controlsConfig: any,
    ): FormGroup<any>;

    control<T>(
      formState: T,
      validatorOrOpts?: any,
      asyncValidator?: any,
    ): FormControl<T>;

    array<T>(
      controls: T[],
    ): FormArray<T>;
  }
}
`;

/* =========================================================
   ANGULAR PLATFORM BROWSER DECLARATIONS
========================================================= */

const ANGULAR_PLATFORM_BROWSER_TYPES = `
declare module '@angular/platform-browser' {
  export function bootstrapApplication(
    rootComponent: any,
    options?: any,
  ): Promise<any>;
}
`;

/* =========================================================
   MONACO REGISTRATION STATE

   Prevent the same libraries from being registered every
   time the editor component mounts.
========================================================= */

let angularTypesRegistered =
  false;

/* =========================================================
   COMPONENT
========================================================= */

export default function CodeEditor({
  value,

  language,

  onChange,

  readOnly = false,
}: CodeEditorProps) {
  const monacoLanguage =
    getMonacoLanguage(
      language,
    );

  /* =======================================================
     EDITOR MOUNT
  ======================================================= */

  const handleMount:
    OnMount = (
    editor,
    monaco,
  ) => {
    /* =====================================================
       TYPESCRIPT CONFIGURATION
    ===================================================== */

    if (
      !angularTypesRegistered
    ) {
      monaco.languages.typescript.typescriptDefaults
        .addExtraLib(
          ANGULAR_CORE_TYPES,
          'file:///node_modules/@angular/core/index.d.ts',
        );

      monaco.languages.typescript.typescriptDefaults
        .addExtraLib(
          ANGULAR_COMMON_TYPES,
          'file:///node_modules/@angular/common/index.d.ts',
        );

      monaco.languages.typescript.typescriptDefaults
        .addExtraLib(
          ANGULAR_FORMS_TYPES,
          'file:///node_modules/@angular/forms/index.d.ts',
        );

      monaco.languages.typescript.typescriptDefaults
        .addExtraLib(
          ANGULAR_PLATFORM_BROWSER_TYPES,
          'file:///node_modules/@angular/platform-browser/index.d.ts',
        );

      /*
       * JavaScript framework workspaces can also benefit
       * from the same module declarations.
       */
      monaco.languages.typescript.javascriptDefaults
        .addExtraLib(
          ANGULAR_CORE_TYPES,
          'file:///node_modules/@angular/core/index.d.ts',
        );

      monaco.languages.typescript.javascriptDefaults
        .addExtraLib(
          ANGULAR_COMMON_TYPES,
          'file:///node_modules/@angular/common/index.d.ts',
        );

      monaco.languages.typescript.javascriptDefaults
        .addExtraLib(
          ANGULAR_FORMS_TYPES,
          'file:///node_modules/@angular/forms/index.d.ts',
        );

      monaco.languages.typescript.javascriptDefaults
        .addExtraLib(
          ANGULAR_PLATFORM_BROWSER_TYPES,
          'file:///node_modules/@angular/platform-browser/index.d.ts',
        );

      angularTypesRegistered =
        true;
    }

    /*
     * Put keyboard focus
     * directly inside editor.
     */

    editor.focus();
  };

  return (
    <div
      className={
        styles.editorShell
      }
    >
      <Editor
        height="100%"
        width="100%"
        language={
          monacoLanguage
        }
        value={
          value
        }
        theme="vs-dark"
        onMount={
          handleMount
        }
        onChange={(
          nextValue,
        ) => {
          onChange(
            nextValue ?? '',
          );
        }}
        loading={
          <div
            className={
              styles.loading
            }
          >
            Loading editor...
          </div>
        }
        options={{
          readOnly,

          automaticLayout:
            true,

          fontSize:
            13,

          lineHeight:
            21,

          fontFamily:
            'Consolas, Monaco, "Courier New", monospace',

          minimap: {
            enabled:
              true,
          },

          scrollBeyondLastLine:
            false,

          wordWrap:
            'off',

          tabSize:
            4,

          insertSpaces:
            true,

          detectIndentation:
            false,

          renderWhitespace:
            'selection',

          bracketPairColorization: {
            enabled:
              true,
          },

          guides: {
            bracketPairs:
              true,

            indentation:
              true,
          },

          cursorBlinking:
            'smooth',

          cursorSmoothCaretAnimation:
            'on',

          smoothScrolling:
            true,

          mouseWheelZoom:
            true,

          folding:
            true,

          lineNumbers:
            'on',

          glyphMargin:
            false,

          renderLineHighlight:
            'line',

          padding: {
            top:
              12,

            bottom:
              12,
          },

          scrollbar: {
            verticalScrollbarSize:
              9,

            horizontalScrollbarSize:
              9,
          },

          overviewRulerBorder:
            false,

          hideCursorInOverviewRuler:
            true,

          contextmenu:
            true,

          quickSuggestions: {
            other:
              true,

            comments:
              false,

            strings:
              false,
          },

          suggestOnTriggerCharacters:
            true,

          acceptSuggestionOnEnter:
            'on',

          formatOnPaste:
            false,

          formatOnType:
            false,
        }}
      />
    </div>
  );
}