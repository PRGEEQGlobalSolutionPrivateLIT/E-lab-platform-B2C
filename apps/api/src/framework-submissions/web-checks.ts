export type WebFile = { path: string; content: string };

export type WebCheck = {
  name?: string;
  message?: string;
  type: 'element' | 'text' | 'labels' | 'headings' | 'css' | 'media' | 'any' | 'all';
  selector?: string;
  min?: number;
  max?: number;
  pattern?: string;
  flags?: string;
  property?: string;
  value?: string;
  media?: boolean;
  absent?: boolean;
  feature?: string;
  checks?: WebCheck[];
};

export type WebCheckResult = {
  testNumber: number;
  passed: boolean;
  type: string;
  selector?: string;
  message: string;
};

type HtmlNode = {
  tag: string;
  attrs: Record<string, string>;
  children: HtmlNode[];
  parent: HtmlNode | null;
  text: string;
};

type CssRule = { selectors: string[]; decls: { property: string; value: string }[]; media: string | null };

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea', 'title']);
const AUTO_CLOSE: Record<string, string[]> = { li: ['li'], p: ['p'], option: ['option'], tr: ['tr'], td: ['td', 'th'], th: ['td', 'th'], dt: ['dt', 'dd'], dd: ['dt', 'dd'] };
const TYPES = ['element', 'text', 'labels', 'headings', 'css', 'media', 'any', 'all'];

function node(tag: string, parent: HtmlNode | null, attrs: Record<string, string> = {}): HtmlNode {
  return { tag, attrs, children: [], parent, text: '' };
}

function parseAttrs(source: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const pattern = /([^\s"'>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of source.matchAll(pattern)) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attrs;
}

export function parseHtml(html: string): HtmlNode {
  const root = node('#root', null);
  let current = root;
  const token = /<!--[\s\S]*?-->|<![^>]*>|<\/\s*([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>|[^<]+|</g;
  let match: RegExpExecArray | null;
  while ((match = token.exec(html)) !== null) {
    const [whole, closeTag, openTag, attrSource, selfClose] = match;
    if (closeTag) {
      const tag = closeTag.toLowerCase();
      let cursor: HtmlNode | null = current;
      while (cursor && cursor.tag !== tag) cursor = cursor.parent;
      if (cursor && cursor.parent) current = cursor.parent;
    } else if (openTag) {
      const tag = openTag.toLowerCase();
      const closes = AUTO_CLOSE[tag];
      if (closes && closes.includes(current.tag) && current.parent) current = current.parent;
      const element = node(tag, current, parseAttrs(attrSource ?? ''));
      current.children.push(element);
      if (RAW.has(tag)) {
        const end = new RegExp(`</\\s*${tag}\\s*>`, 'ig');
        end.lastIndex = token.lastIndex;
        const found = end.exec(html);
        element.children.push({ ...node('#text', element), text: html.slice(token.lastIndex, found ? found.index : html.length) });
        token.lastIndex = found ? end.lastIndex : html.length;
      } else if (!VOID.has(tag) && !selfClose) {
        current = element;
      }
    } else if (!whole.startsWith('<!')) {
      current.children.push({ ...node('#text', current), text: whole });
    }
  }
  return root;
}

function elements(root: HtmlNode): HtmlNode[] {
  const out: HtmlNode[] = [];
  const walk = (n: HtmlNode) => {
    for (const child of n.children) {
      if (child.tag === '#text') continue;
      out.push(child);
      walk(child);
    }
  };
  walk(root);
  return out;
}

function textOf(n: HtmlNode): string {
  if (n.tag === '#text') return n.text;
  if (n.tag === 'script' || n.tag === 'style') return '';
  return n.children.map(textOf).join(' ');
}

type Attr = { name: string; op: string | null; value: string };
type Compound = { tag: string | null; ids: string[]; classes: string[]; attrs: Attr[]; nots: Compound[]; pseudo: string[] };
type Step = { compound: Compound; combinator: ' ' | '>' };

function splitTop(source: string, separator: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote = '';
  let start = 0;
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (ch === quote) quote = '';
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '(' || ch === '[') depth += 1;
    else if (ch === ')' || ch === ']') depth -= 1;
    else if (ch === separator && depth === 0) {
      parts.push(source.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(source.slice(start));
  return parts.map((part) => part.trim()).filter(Boolean);
}

function parseCompound(source: string): Compound {
  const compound: Compound = { tag: null, ids: [], classes: [], attrs: [], nots: [], pseudo: [] };
  const pattern = /^(\*|[a-zA-Z][\w-]*)|#([\w-]+)|\.([\w-]+)|\[\s*([\w:-]+)\s*(?:([~^$*|]?=)\s*(?:"([^"]*)"|'([^']*)'|([^\]\s]+)))?\s*\]|:not\(([^)]*)\)|(::?[\w-]+(?:\([^)]*\))?)/g;
  for (const match of source.matchAll(pattern)) {
    if (match[1]) compound.tag = match[1] === '*' ? null : match[1].toLowerCase();
    else if (match[2]) compound.ids.push(match[2]);
    else if (match[3]) compound.classes.push(match[3]);
    else if (match[4]) compound.attrs.push({ name: match[4].toLowerCase(), op: match[5] ?? null, value: (match[6] ?? match[7] ?? match[8] ?? '').toLowerCase() });
    else if (match[9] !== undefined) compound.nots.push(parseCompound(match[9]));
    else if (match[10]) compound.pseudo.push(match[10].toLowerCase());
  }
  return compound;
}

function parseSelector(source: string): Step[] {
  const steps: Step[] = [];
  const tokens = source.replace(/\s*>\s*/g, ' > ').trim().split(/\s+/);
  let combinator: ' ' | '>' = ' ';
  for (const tokenText of tokens) {
    if (tokenText === '>') {
      combinator = '>';
      continue;
    }
    steps.push({ compound: parseCompound(tokenText), combinator });
    combinator = ' ';
  }
  return steps;
}

function attrMatches(element: HtmlNode, attr: Attr): boolean {
  if (!(attr.name in element.attrs)) return false;
  if (!attr.op) return true;
  const actual = element.attrs[attr.name].toLowerCase();
  switch (attr.op) {
    case '=':
      return actual === attr.value;
    case '^=':
      return actual.startsWith(attr.value);
    case '$=':
      return actual.endsWith(attr.value);
    case '*=':
      return actual.includes(attr.value);
    case '~=':
      return actual.split(/\s+/).includes(attr.value);
    case '|=':
      return actual === attr.value || actual.startsWith(`${attr.value}-`);
    default:
      return false;
  }
}

function compoundMatches(element: HtmlNode, compound: Compound): boolean {
  if (compound.tag && element.tag !== compound.tag) return false;
  const classes = (element.attrs.class ?? '').split(/\s+/);
  if (compound.classes.some((name) => !classes.includes(name))) return false;
  if (compound.ids.some((id) => element.attrs.id !== id)) return false;
  if (compound.attrs.some((attr) => !attrMatches(element, attr))) return false;
  if (compound.nots.some((inner) => compoundMatches(element, inner))) return false;
  return true;
}

function stepsMatch(element: HtmlNode, steps: Step[], index: number): boolean {
  if (!compoundMatches(element, steps[index].compound)) return false;
  if (index === 0) return true;
  if (steps[index].combinator === '>') {
    return element.parent !== null && element.parent.tag !== '#root' && stepsMatch(element.parent, steps, index - 1);
  }
  for (let cursor = element.parent; cursor && cursor.tag !== '#root'; cursor = cursor.parent) {
    if (stepsMatch(cursor, steps, index - 1)) return true;
  }
  return false;
}

export function querySelectorAll(root: HtmlNode, selector: string): HtmlNode[] {
  const groups = splitTop(selector, ',').map(parseSelector).filter((steps) => steps.length > 0);
  return elements(root).filter((element) => groups.some((steps) => stepsMatch(element, steps, steps.length - 1)));
}

export function parseCss(source: string, media: string | null = null): CssRule[] {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules: CssRule[] = [];
  let i = 0;
  while (i < css.length) {
    let j = i;
    let quote = '';
    while (j < css.length) {
      const ch = css[j];
      if (quote) {
        if (ch === quote) quote = '';
      } else if (ch === '"' || ch === "'") quote = ch;
      else if (ch === '{' || ch === ';' || ch === '}') break;
      j += 1;
    }
    const prelude = css.slice(i, j).trim();
    if (j >= css.length) break;
    if (css[j] !== '{') {
      i = j + 1;
      continue;
    }
    let depth = 1;
    let k = j + 1;
    while (k < css.length && depth > 0) {
      if (css[k] === '{') depth += 1;
      else if (css[k] === '}') depth -= 1;
      k += 1;
    }
    const body = css.slice(j + 1, k - 1);
    if (prelude.startsWith('@')) {
      const name = prelude.slice(1).split(/[\s(]/)[0].toLowerCase();
      if (name === 'media') rules.push(...parseCss(body, prelude.slice(6).trim()));
      else if (name === 'supports' || name === 'layer' || name === 'container') rules.push(...parseCss(body, media));
    } else if (prelude) {
      const decls = splitTop(body, ';')
        .map((decl) => {
          const colon = decl.indexOf(':');
          return colon < 0 ? null : { property: decl.slice(0, colon).trim().toLowerCase(), value: decl.slice(colon + 1).replace(/!important/i, '').trim() };
        })
        .filter((decl): decl is { property: string; value: string } => decl !== null && decl.property.length > 0);
      rules.push({ selectors: splitTop(prelude, ','), decls, media });
    }
    i = k;
  }
  return rules;
}

function containsCompound(actual: Compound, wanted: Compound): boolean {
  if (wanted.tag && actual.tag !== wanted.tag) return false;
  if (wanted.classes.some((name) => !actual.classes.includes(name))) return false;
  if (wanted.ids.some((id) => !actual.ids.includes(id))) return false;
  if (wanted.attrs.some((attr) => !actual.attrs.some((a) => a.name === attr.name && a.op === attr.op && a.value === attr.value))) return false;
  if (actual.pseudo.some((p) => !wanted.pseudo.includes(p))) return false;
  return true;
}

function cssSelectorMatches(ruleSelector: string, target: string): boolean {
  const rule = parseSelector(ruleSelector).map((step) => step.compound);
  const wanted = parseSelector(target).map((step) => step.compound);
  if (rule.length === 0 || wanted.length === 0) return false;
  if (!containsCompound(rule[rule.length - 1], wanted[wanted.length - 1])) return false;
  let r = rule.length - 2;
  for (let w = wanted.length - 2; w >= 0; w -= 1) {
    while (r >= 0 && !containsCompound(rule[r], wanted[w])) r -= 1;
    if (r < 0) return false;
    r -= 1;
  }
  return true;
}

function regex(pattern: string, flags = 'i'): RegExp {
  return new RegExp(pattern, flags.replace(/[gy]/g, ''));
}

type Context = { dom: HtmlNode; css: CssRule[] };

function labelled(dom: HtmlNode): boolean {
  const controls = querySelectorAll(dom, 'input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=reset]):not([type=image]), select, textarea');
  if (controls.length === 0) return false;
  const forIds = new Set(querySelectorAll(dom, 'label[for]').map((label) => label.attrs.for));
  return controls.every((control) => {
    for (let cursor = control.parent; cursor; cursor = cursor.parent) if (cursor.tag === 'label') return true;
    return (control.attrs.id !== undefined && forIds.has(control.attrs.id)) || Boolean((control.attrs['aria-label'] ?? '').trim());
  });
}

function headingsInOrder(dom: HtmlNode): boolean {
  const levels = elements(dom).filter((n) => /^h[1-6]$/.test(n.tag)).map((n) => Number(n.tag[1]));
  if (levels.filter((level) => level === 1).length !== 1 || levels[0] !== 1) return false;
  return levels.every((level, index) => index === 0 || level <= levels[index - 1] + 1);
}

function evaluate(check: WebCheck, context: Context): boolean {
  switch (check.type) {
    case 'element': {
      const count = querySelectorAll(context.dom, check.selector ?? '').length;
      return count >= (check.min ?? 1) && (check.max === undefined || count <= check.max);
    }
    case 'text': {
      const pattern = regex(check.pattern ?? '\\S', check.flags);
      const count = querySelectorAll(context.dom, check.selector ?? '').filter((n) => pattern.test(textOf(n).replace(/\s+/g, ' ').trim())).length;
      return count >= (check.min ?? 1);
    }
    case 'labels':
      return labelled(context.dom);
    case 'headings':
      return headingsInOrder(context.dom);
    case 'media': {
      const feature = regex(check.feature ?? '(max|min)-width');
      return context.css.some((rule) => rule.media !== null && feature.test(rule.media) && rule.decls.length > 0);
    }
    case 'css': {
      const property = regex(`^(?:${check.property ?? '.*'})$`);
      const value = check.value !== undefined ? regex(check.value, check.flags) : null;
      const found = context.css.some(
        (rule) =>
          (check.media === undefined || (rule.media !== null) === check.media) &&
          rule.selectors.some((selector) => cssSelectorMatches(selector, check.selector ?? '')) &&
          rule.decls.some((decl) => property.test(decl.property) && (!value || value.test(decl.value))),
      );
      return check.absent ? !found : found;
    }
    case 'any':
      return (check.checks ?? []).some((inner) => evaluate(inner, context));
    case 'all':
      return (check.checks ?? []).every((inner) => evaluate(inner, context));
    default:
      return false;
  }
}

export function evaluateWebChecks(files: WebFile[], checks: WebCheck[]): WebCheckResult[] {
  const html = files.filter((file) => /\.html?$/i.test(file.path)).sort((a, b) => Number(!/index\.html?$/i.test(a.path)) - Number(!/index\.html?$/i.test(b.path)));
  const dom = parseHtml(html.map((file) => file.content).join('\n'));
  const styles = querySelectorAll(dom, 'style').map(textOf);
  const css = [...files.filter((file) => /\.css$/i.test(file.path)).map((file) => file.content), ...styles].flatMap((source) => parseCss(source));
  return checks.map((check, index) => {
    let passed = false;
    try {
      passed = evaluate(check, { dom, css });
    } catch {
      passed = false;
    }
    return { testNumber: index + 1, passed, type: check.type, selector: check.selector, message: check.name ?? check.message ?? `Check ${index + 1}` };
  });
}

function invalid(message: string): never {
  throw new Error(message);
}

export function normalizeWebCheck(input: unknown, nested = false): WebCheck {
  if (!input || typeof input !== 'object' || Array.isArray(input)) invalid('each web check must be a JSON object.');
  const spec = input as Record<string, unknown>;
  const type = spec.type;
  if (typeof type !== 'string' || !TYPES.includes(type)) invalid(`"type" must be one of ${TYPES.join(', ')}.`);
  const out: WebCheck = { type: type as WebCheck['type'] };
  if (!nested) {
    if (typeof spec.name !== 'string' || !spec.name.trim()) invalid('"name" is required.');
    out.name = spec.name.trim();
  }
  for (const key of ['selector', 'pattern', 'flags', 'property', 'value', 'feature', 'message'] as const) {
    const value = spec[key];
    if (value === undefined || value === null || value === '') continue;
    if (typeof value !== 'string') invalid(`"${key}" must be text.`);
    out[key] = value;
  }
  for (const key of ['min', 'max'] as const) {
    const value = spec[key];
    if (value === undefined || value === null) continue;
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) invalid(`"${key}" must be a whole number.`);
    out[key] = value;
  }
  for (const key of ['media', 'absent'] as const) {
    const value = spec[key];
    if (value === undefined || value === null) continue;
    if (typeof value !== 'boolean') invalid(`"${key}" must be true or false.`);
    out[key] = value;
  }
  if (['element', 'text', 'css'].includes(type) && !out.selector) invalid(`"selector" is required for ${type} checks.`);
  if (type === 'text' && !out.pattern) invalid('"pattern" is required for text checks.');
  if (type === 'css' && !out.property) invalid('"property" is required for css checks.');
  for (const key of ['pattern', 'value', 'feature', 'property'] as const) {
    if (out[key] === undefined) continue;
    try {
      regex(out[key]!, out.flags);
    } catch {
      invalid(`"${key}" is not a valid regular expression.`);
    }
  }
  if (type === 'any' || type === 'all') {
    if (!Array.isArray(spec.checks) || spec.checks.length === 0) invalid(`"checks" must be a non-empty list for ${type} checks.`);
    out.checks = spec.checks.map((inner) => normalizeWebCheck(inner, true));
  }
  return out;
}
