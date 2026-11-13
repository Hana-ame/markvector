export interface SvgThemeConfig {
  id: string;
  name: string;
  width: number;
  padding: number;
  fontSize: number;
  lineHeight: number;
  borderRadius: number;
  // Canvas & Card Colors
  backgroundColor: string;
  cardBackground: string;
  borderColor: string;
  textColor: string;
  headingColor: string;
  mutedColor: string;
  // Semantic Color Replacements for Bold / Italic / Code
  boldColor: string;
  italicColor: string;
  boldItalicColor: string;
  inlineCodeColor: string;
  inlineCodeBg: string;
  linkColor: string;
  blockquoteBorderColor: string;
  blockquoteBg: string;
  // Behavioral toggles
  keepBoldWeight: boolean;
  keepItalicStyle: boolean;
  showCodeLineNumbers: boolean;
  showCodeMacHeader: boolean;
  showColorLegend: boolean;
  showCardShadow: boolean;
  // Code Block Theme
  codeBlockBg: string;
  codeBlockBorder: string;
  codeBlockText: string;
  syntaxKeyword: string;
  syntaxString: string;
  syntaxComment: string;
  syntaxNumber: string;
  syntaxFunction: string;
  syntaxType: string;
  syntaxOperator: string;
}

export interface InlineToken {
  type: 'text' | 'bold' | 'italic' | 'bold-italic' | 'code' | 'strike' | 'link';
  text: string;
  url?: string;
}

export interface CodeToken {
  type: 'keyword' | 'string' | 'comment' | 'number' | 'function' | 'type' | 'operator' | 'plain';
  text: string;
}

export type MarkdownBlock =
  | { type: 'heading'; level: number; tokens: InlineToken[]; raw: string }
  | { type: 'paragraph'; tokens: InlineToken[]; raw: string }
  | { type: 'codeblock'; lang: string; lines: CodeToken[][]; rawLines: string[] }
  | { type: 'blockquote'; lines: InlineToken[][] }
  | {
      type: 'list';
      ordered: boolean;
      items: {
        indent: number;
        index: number;
        checked: boolean | null;
        tokens: InlineToken[];
      }[];
    }
  | {
      type: 'table';
      headers: InlineToken[][];
      alignments: ('left' | 'center' | 'right')[];
      rows: InlineToken[][][];
    }
  | { type: 'hr' };

export interface SvgRenderResult {
  svgString: string;
  width: number;
  height: number;
  blockCount: number;
  stats: {
    boldCount: number;
    italicCount: number;
    codeBlockCount: number;
    inlineCodeCount: number;
  };
}

export const THEME_PRESETS: Record<string, SvgThemeConfig> = {
  editorialLight: {
    id: 'editorialLight',
    name: '纸张亮色 (Editorial Light)',
    width: 760,
    padding: 44,
    fontSize: 16,
    lineHeight: 1.65,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    cardBackground: '#FFFFFF',
    borderColor: '#E2E8F0',
    textColor: '#1E293B',
    headingColor: '#0F172A',
    mutedColor: '#64748B',
    boldColor: '#E11D48', // Rose Crimson for Bold
    italicColor: '#0284C7', // Ocean Blue for Italic
    boldItalicColor: '#D97706', // Amber Gold for Bold+Italic
    inlineCodeColor: '#7C3AED', // Violet for Inline Code
    inlineCodeBg: '#F3E8FF',
    linkColor: '#2563EB',
    blockquoteBorderColor: '#CBD5E1',
    blockquoteBg: '#F8FAFC',
    keepBoldWeight: false,
    keepItalicStyle: false,
    showCodeLineNumbers: true,
    showCodeMacHeader: true,
    showColorLegend: true,
    showCardShadow: true,
    codeBlockBg: '#0F172A',
    codeBlockBorder: '#1E293B',
    codeBlockText: '#E2E8F0',
    syntaxKeyword: '#F472B6',
    syntaxString: '#34D399',
    syntaxComment: '#64748B',
    syntaxNumber: '#FBBF24',
    syntaxFunction: '#60A5FA',
    syntaxType: '#A78BFA',
    syntaxOperator: '#94A3B8',
  },
  obsidianDark: {
    id: 'obsidianDark',
    name: '极客暗色 (Obsidian Dark)',
    width: 760,
    padding: 44,
    fontSize: 16,
    lineHeight: 1.65,
    borderRadius: 16,
    backgroundColor: '#090D16',
    cardBackground: '#111827',
    borderColor: '#1F2937',
    textColor: '#E5E7EB',
    headingColor: '#F9FAFB',
    mutedColor: '#9CA3AF',
    boldColor: '#FB7185', // Coral Rose for Bold
    italicColor: '#38BDF8', // Sky Cyan for Italic
    boldItalicColor: '#FBBF24', // Warm Gold for Bold+Italic
    inlineCodeColor: '#A78BFA', // Soft Purple for Inline Code
    inlineCodeBg: '#1E1B4B',
    linkColor: '#60A5FA',
    blockquoteBorderColor: '#374151',
    blockquoteBg: '#1F2937',
    keepBoldWeight: false,
    keepItalicStyle: false,
    showCodeLineNumbers: true,
    showCodeMacHeader: true,
    showColorLegend: true,
    showCardShadow: true,
    codeBlockBg: '#030712',
    codeBlockBorder: '#1F2937',
    codeBlockText: '#F3F4F6',
    syntaxKeyword: '#FF7B72',
    syntaxString: '#7EE787',
    syntaxComment: '#6E7681',
    syntaxNumber: '#79C0FF',
    syntaxFunction: '#D2A8FF',
    syntaxType: '#FFA657',
    syntaxOperator: '#8B949E',
  },
  warmParchment: {
    id: 'warmParchment',
    name: '暖阳书页 (Warm Parchment)',
    width: 760,
    padding: 44,
    fontSize: 16,
    lineHeight: 1.65,
    borderRadius: 16,
    backgroundColor: '#EFECE6',
    cardBackground: '#FAF8F5',
    borderColor: '#E5E0D8',
    textColor: '#292524',
    headingColor: '#1C1917',
    mutedColor: '#78716C',
    boldColor: '#C2410C', // Terracotta Rust for Bold
    italicColor: '#0F766E', // Deep Teal for Italic
    boldItalicColor: '#B45309', // Bronze for Bold+Italic
    inlineCodeColor: '#9333EA',
    inlineCodeBg: '#F3E8FF',
    linkColor: '#1D4ED8',
    blockquoteBorderColor: '#D6D3D1',
    blockquoteBg: '#F5F2EB',
    keepBoldWeight: false,
    keepItalicStyle: false,
    showCodeLineNumbers: true,
    showCodeMacHeader: true,
    showColorLegend: true,
    showCardShadow: true,
    codeBlockBg: '#1C1917',
    codeBlockBorder: '#292524',
    codeBlockText: '#F5F5F4',
    syntaxKeyword: '#FB923C',
    syntaxString: '#4ADE80',
    syntaxComment: '#78716C',
    syntaxNumber: '#FACC15',
    syntaxFunction: '#38BDF8',
    syntaxType: '#C084FC',
    syntaxOperator: '#A8A29E',
  },
  nordicForest: {
    id: 'nordicForest',
    name: '森系冷调 (Nordic Slate)',
    width: 760,
    padding: 44,
    fontSize: 16,
    lineHeight: 1.65,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    cardBackground: '#F8FAFC',
    borderColor: '#CBD5E1',
    textColor: '#1E293B',
    headingColor: '#0F172A',
    mutedColor: '#64748B',
    boldColor: '#2563EB', // Royal Cobalt for Bold
    italicColor: '#059669', // Emerald Green for Italic
    boldItalicColor: '#E11D48', // Crimson for Bold+Italic
    inlineCodeColor: '#D97706',
    inlineCodeBg: '#FEF3C7',
    linkColor: '#0284C7',
    blockquoteBorderColor: '#94A3B8',
    blockquoteBg: '#F1F5F9',
    keepBoldWeight: false,
    keepItalicStyle: false,
    showCodeLineNumbers: true,
    showCodeMacHeader: true,
    showColorLegend: true,
    showCardShadow: true,
    codeBlockBg: '#1E293B',
    codeBlockBorder: '#334155',
    codeBlockText: '#F1F5F9',
    syntaxKeyword: '#81A1C1',
    syntaxString: '#A3BE8C',
    syntaxComment: '#616E88',
    syntaxNumber: '#B48EAD',
    syntaxFunction: '#88C0D0',
    syntaxType: '#EBCB8B',
    syntaxOperator: '#D8DEE9',
  },
};

const SANS_FONT_FAMILY =
  "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";
const MONO_FONT_FAMILY =
  "'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";

export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Tokenize inline Markdown formatting:
 * - `code`
 * - ***bold-italic*** or ___bold-italic___
 * - **bold** or __bold__
 * - *italic* or _italic_
 * - ~~strike~~
 * - [label](url)
 */
export function tokenizeInline(text: string): InlineToken[] {
  if (!text) return [];
  const tokens: InlineToken[] = [];
  const pattern =
    /(`[^`]+`)|(\*\*\*[^*]+\*\*\*|___[^_]+___)|(\*\*[^*]+\*\*|__[^_]+__)|(\*[^*\s][^*]*\*|_[^_\s][^_]*_)|(~~[^~]+~~)|(\[[^\]]+\]\([^)]+\))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        text: text.slice(lastIndex, match.index),
      });
    }

    const full = match[0];
    if (match[1]) {
      tokens.push({ type: 'code', text: full.slice(1, -1) });
    } else if (match[2]) {
      tokens.push({ type: 'bold-italic', text: full.slice(3, -3) });
    } else if (match[3]) {
      tokens.push({ type: 'bold', text: full.slice(2, -2) });
    } else if (match[4]) {
      tokens.push({ type: 'italic', text: full.slice(1, -1) });
    } else if (match[5]) {
      tokens.push({ type: 'strike', text: full.slice(2, -2) });
    } else if (match[6]) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(full);
      if (linkMatch) {
        tokens.push({ type: 'link', text: linkMatch[1], url: linkMatch[2] });
      } else {
        tokens.push({ type: 'text', text: full });
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: 'text',
      text: text.slice(lastIndex),
    });
  }

  return tokens;
}

const CODE_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'break', 'continue', 'import', 'from', 'export', 'default',
  'interface', 'type', 'class', 'extends', 'implements', 'new', 'async', 'await',
  'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'void',
  'null', 'undefined', 'true', 'false', 'def', 'elif', 'lambda', 'yield', 'with',
  'as', 'pass', 'None', 'True', 'False', 'and', 'or', 'not', 'fn', 'pub', 'struct',
  'enum', 'impl', 'match', 'use', 'mut', 'crate', 'package', 'func', 'go', 'defer',
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
  'JOIN', 'LEFT', 'RIGHT', 'INNER', 'ON', 'GROUP', 'BY', 'ORDER', 'LIMIT', 'AS',
]);

const CODE_TYPES = new Set([
  'string', 'number', 'boolean', 'any', 'never', 'unknown', 'Record', 'Array',
  'Promise', 'Map', 'Set', 'Date', 'RegExp', 'Error', 'Object', 'Math', 'JSON',
  'console', 'window', 'document', 'React', 'HTMLElement', 'SVGElement', 'int',
  'float', 'str', 'bool', 'list', 'dict', 'tuple', 'i32', 'u32', 'i64', 'u64',
  'f32', 'f64', 'usize', 'String', 'Vec', 'Option', 'Result',
]);

/**
 * Syntax highlighter for lines inside fenced code blocks
 */
export function tokenizeCodeLine(line: string): CodeToken[] {
  if (!line) return [{ type: 'plain', text: '' }];

  const tokens: CodeToken[] = [];
  const tokenRegex =
    /(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b(?=\s*\())|(\b[A-Za-z_][A-Za-z0-9_]*\b)|([+\-*/%=<>!&|^~?:;,.()[\]{}]+)|(\s+)/g;

  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIdx) {
      tokens.push({ type: 'plain', text: line.slice(lastIdx, match.index) });
    }

    const full = match[0];
    if (match[1]) {
      tokens.push({ type: 'comment', text: full });
    } else if (match[2]) {
      tokens.push({ type: 'string', text: full });
    } else if (match[3]) {
      tokens.push({ type: 'number', text: full });
    } else if (match[4]) {
      if (CODE_KEYWORDS.has(full)) {
        tokens.push({ type: 'keyword', text: full });
      } else {
        tokens.push({ type: 'function', text: full });
      }
    } else if (match[5]) {
      if (CODE_KEYWORDS.has(full)) {
        tokens.push({ type: 'keyword', text: full });
      } else if (CODE_TYPES.has(full)) {
        tokens.push({ type: 'type', text: full });
      } else {
        tokens.push({ type: 'plain', text: full });
      }
    } else if (match[6]) {
      tokens.push({ type: 'operator', text: full });
    } else {
      tokens.push({ type: 'plain', text: full });
    }

    lastIdx = tokenRegex.lastIndex;
  }

  if (lastIdx < line.length) {
    tokens.push({ type: 'plain', text: line.slice(lastIdx) });
  }

  return tokens;
}

/**
 * Parse Markdown string into block AST
 */
export function parseMarkdown(markdown: string): MarkdownBlock[] {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
  const blocks: MarkdownBlock[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // 1. Fenced Code Block
    const fenceMatch = /^```([\w+-]*)\s*$/.exec(line.trim());
    if (fenceMatch) {
      const lang = fenceMatch[1] || 'text';
      const rawLines: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) {
        rawLines.push(lines[i].replace(/\t/g, '  '));
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      blocks.push({
        type: 'codeblock',
        lang,
        rawLines,
        lines: rawLines.map((l) => tokenizeCodeLine(l)),
      });
      continue;
    }

    // 2. Horizontal Rule
    if (/^(---|\*\*\*|___)\s*$/.test(line.trim())) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // 3. Heading
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(line.trim());
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2].trim();
      blocks.push({
        type: 'heading',
        level,
        raw: content,
        tokens: tokenizeInline(content),
      });
      i++;
      continue;
    }

    // 4. Table
    if (
      line.includes('|') &&
      i + 1 < lines.length &&
      /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(lines[i + 1])
    ) {
      const parseTableRow = (rowStr: string): string[] => {
        const trimmed = rowStr.trim().replace(/^\|/, '').replace(/\|$/, '');
        return trimmed.split('|').map((c) => c.trim());
      };

      const headerCells = parseTableRow(line);
      const alignCells = parseTableRow(lines[i + 1]);
      const alignments: ('left' | 'center' | 'right')[] = alignCells.map((cell) => {
        if (cell.startsWith(':') && cell.endsWith(':')) return 'center';
        if (cell.endsWith(':')) return 'right';
        return 'left';
      });

      const headers = headerCells.map((c) => tokenizeInline(c));
      const rows: InlineToken[][][] = [];
      i += 2;

      while (i < lines.length && lines[i].trim() !== '' && lines[i].includes('|')) {
        const rowCells = parseTableRow(lines[i]);
        rows.push(rowCells.map((c) => tokenizeInline(c)));
        i++;
      }

      blocks.push({
        type: 'table',
        headers,
        alignments,
        rows,
      });
      continue;
    }

    // 5. Blockquote
    if (line.trim().startsWith('>')) {
      const quoteLines: InlineToken[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        const cleaned = lines[i].trim().replace(/^>\s?/, '');
        quoteLines.push(tokenizeInline(cleaned));
        i++;
      }
      blocks.push({
        type: 'blockquote',
        lines: quoteLines,
      });
      continue;
    }

    // 6. Lists (Ordered, Unordered, Task Lists)
    const listMatch = /^(\s*)([-*+]|\d+\.)\s+(.*)$/.exec(line);
    if (listMatch) {
      const isOrdered = /^\d+\.$/.test(listMatch[2]);
      const items: {
        indent: number;
        index: number;
        checked: boolean | null;
        tokens: InlineToken[];
      }[] = [];

      let itemCounter = 1;
      while (i < lines.length) {
        const m = /^(\s*)([-*+]|\d+\.)\s+(.*)$/.exec(lines[i]);
        if (!m) break;
        const indent = Math.floor(m[1].length / 2);
        let itemText = m[3].trim();
        let checked: boolean | null = null;

        const taskMatch = /^\[([ xX])\]\s+(.*)$/.exec(itemText);
        if (taskMatch) {
          checked = taskMatch[1].toLowerCase() === 'x';
          itemText = taskMatch[2];
        }

        items.push({
          indent,
          index: itemCounter++,
          checked,
          tokens: tokenizeInline(itemText),
        });
        i++;
      }

      blocks.push({
        type: 'list',
        ordered: isOrdered,
        items,
      });
      continue;
    }

    // 7. Paragraph (accumulate consecutive plain lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^```/.test(lines[i].trim()) &&
      !/^(#{1,6})\s+/.test(lines[i].trim()) &&
      !/^(---|\*\*\*|___)\s*$/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('>') &&
      !/^(\s*)([-*+]|\d+\.)\s+/.test(lines[i])
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    const joined = paraLines.join(' ');
    if (joined) {
      blocks.push({
        type: 'paragraph',
        raw: joined,
        tokens: tokenizeInline(joined),
      });
    }
  }

  return blocks;
}

/**
 * Estimate pixel width of a single character for mixed CJK + Latin wrapping
 */
export function estimateCharWidth(ch: string, fontSize: number, isMono = false): number {
  const code = ch.charCodeAt(0);
  // Full-width CJK & full-width punctuation
  if (
    (code >= 0x2e80 && code <= 0x9fff) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xfe30 && code <= 0xfe4f) ||
    (code >= 0xff00 && code <= 0xffef)
  ) {
    return fontSize * 1.02;
  }
  if (isMono) {
    return fontSize * 0.61;
  }
  if ('ilI1.,:;\'!|()[]{} '.includes(ch)) {
    return fontSize * 0.36;
  }
  if ('mwMW@%'.includes(ch)) {
    return fontSize * 0.78;
  }
  if (ch >= 'A' && ch <= 'Z') {
    return fontSize * 0.66;
  }
  return fontSize * 0.56;
}

export function estimateTextWidth(text: string, fontSize: number, isMono = false): number {
  let total = 0;
  for (let i = 0; i < text.length; i++) {
    total += estimateCharWidth(text[i], fontSize, isMono);
  }
  return total;
}

/**
 * Wrap InlineToken[] into lines that fit within maxWidth
 */
export function wrapInlineTokens(
  tokens: InlineToken[],
  maxWidth: number,
  fontSize: number
): InlineToken[][] {
  if (tokens.length === 0) return [[]];

  const lines: InlineToken[][] = [];
  let currentLine: InlineToken[] = [];
  let currentWidth = 0;

  const pushTokenToCurrentLine = (type: InlineToken['type'], text: string, url?: string) => {
    if (!text) return;
    const last = currentLine[currentLine.length - 1];
    if (last && last.type === type && last.url === url) {
      last.text += text;
    } else {
      currentLine.push({ type, text, url });
    }
  };

  for (const token of tokens) {
    const isCode = token.type === 'code';
    const tokenFontSize = isCode ? fontSize * 0.92 : fontSize;

    // Split text into atomic wrap units: CJK characters individually, or Latin words + spaces
    const units = token.text.match(/[\u2e80-\u9fff\uf900-\ufaff\ufe30-\ufe4f\uff00-\uffef]|[^\s\u2e80-\u9fff\uf900-\ufaff\ufe30-\ufe4f\uff00-\uffef]+|\s+/g) || [token.text];

    for (const unit of units) {
      const unitWidth = estimateTextWidth(unit, tokenFontSize, isCode);

      if (currentWidth + unitWidth > maxWidth && currentLine.length > 0) {
        // If unit is a single very long Latin word/URL, break it character by character
        if (unitWidth > maxWidth) {
          for (const ch of unit) {
            const chW = estimateCharWidth(ch, tokenFontSize, isCode);
            if (currentWidth + chW > maxWidth && currentLine.length > 0) {
              lines.push(currentLine);
              currentLine = [];
              currentWidth = 0;
            }
            pushTokenToCurrentLine(token.type, ch, token.url);
            currentWidth += chW;
          }
          continue;
        }

        // Start a new line
        lines.push(currentLine);
        currentLine = [];
        currentWidth = 0;

        // Avoid leading whitespace on wrapped line
        const trimmedStart = unit.replace(/^\s+/, '');
        if (trimmedStart) {
          pushTokenToCurrentLine(token.type, trimmedStart, token.url);
          currentWidth += estimateTextWidth(trimmedStart, tokenFontSize, isCode);
        }
      } else {
        pushTokenToCurrentLine(token.type, unit, token.url);
        currentWidth += unitWidth;
      }
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines.length > 0 ? lines : [[]];
}

/**
 * Render an array of InlineToken into SVG <tspan> markup.
 * Specifically implements the core requirement:
 * Bold & Italic use distinct custom colors instead of relying on font weight / slant!
 */
function renderInlineTokensToTspans(
  tokens: InlineToken[],
  config: SvgThemeConfig,
  defaultColor: string,
  stats: SvgRenderResult['stats']
): string {
  return tokens
    .map((token) => {
      const escaped = escapeXml(token.text);
      switch (token.type) {
        case 'bold': {
          stats.boldCount++;
          const weight = config.keepBoldWeight ? '700' : '500';
          return `<tspan fill="${config.boldColor}" font-weight="${weight}" data-token="bold">${escaped}</tspan>`;
        }
        case 'italic': {
          stats.italicCount++;
          const style = config.keepItalicStyle ? 'italic' : 'normal';
          return `<tspan fill="${config.italicColor}" font-style="${style}" data-token="italic">${escaped}</tspan>`;
        }
        case 'bold-italic': {
          stats.boldCount++;
          stats.italicCount++;
          const weight = config.keepBoldWeight ? '700' : '500';
          const style = config.keepItalicStyle ? 'italic' : 'normal';
          return `<tspan fill="${config.boldItalicColor}" font-weight="${weight}" font-style="${style}" data-token="bold-italic">${escaped}</tspan>`;
        }
        case 'code': {
          stats.inlineCodeCount++;
          return `<tspan fill="${config.inlineCodeColor}" font-family="${escapeXml(MONO_FONT_FAMILY)}" font-size="0.9em" data-token="inline-code">&#96;${escaped}&#96;</tspan>`;
        }
        case 'strike': {
          return `<tspan fill="${config.mutedColor}" text-decoration="line-through" data-token="strike">${escaped}</tspan>`;
        }
        case 'link': {
          return `<tspan fill="${config.linkColor}" text-decoration="underline" data-token="link">${escaped}</tspan>`;
        }
        case 'text':
        default:
          return `<tspan fill="${defaultColor}">${escaped}</tspan>`;
      }
    })
    .join('');
}

/**
 * Convert Markdown string and SvgThemeConfig into a complete standalone SVG document
 */
export function renderMarkdownToSvg(
  markdown: string,
  config: SvgThemeConfig = THEME_PRESETS.editorialLight
): SvgRenderResult {
  const blocks = parseMarkdown(markdown);
  const stats = {
    boldCount: 0,
    italicCount: 0,
    codeBlockCount: 0,
    inlineCodeCount: 0,
  };

  const outerMargin = 24;
  const cardX = outerMargin;
  const cardY = outerMargin;
  const cardWidth = config.width - outerMargin * 2;
  const contentX = cardX + config.padding;
  const contentMaxWidth = cardWidth - config.padding * 2;

  let cursorY = cardY + config.padding;
  const svgElements: string[] = [];

  const baseFontSize = config.fontSize;
  const baseLineHeightPx = Math.round(baseFontSize * config.lineHeight);

  for (let bIdx = 0; bIdx < blocks.length; bIdx++) {
    const block = blocks[bIdx];

    if (block.type === 'heading') {
      const scaleMap: Record<number, number> = {
        1: 1.75,
        2: 1.42,
        3: 1.2,
        4: 1.08,
        5: 1.0,
        6: 0.92,
      };
      const hSize = Math.round(baseFontSize * (scaleMap[block.level] || 1));
      const hLineHeight = Math.round(hSize * 1.38);

      if (bIdx > 0) {
        cursorY += block.level <= 2 ? 14 : 8;
      }

      const wrappedLines = wrapInlineTokens(block.tokens, contentMaxWidth, hSize);
      for (const lineTokens of wrappedLines) {
        cursorY += hSize;
        const tspans = renderInlineTokensToTspans(
          lineTokens,
          config,
          config.headingColor,
          stats
        );
        svgElements.push(
          `<text x="${contentX}" y="${cursorY}" font-family="${escapeXml(SANS_FONT_FAMILY)}" font-size="${hSize}" font-weight="700" fill="${config.headingColor}">${tspans}</text>`
        );
        cursorY += hLineHeight - hSize;
      }

      // Subtle bottom divider for H1 and H2
      if (block.level === 1 || block.level === 2) {
        cursorY += 6;
        svgElements.push(
          `<line x1="${contentX}" y1="${cursorY}" x2="${contentX + contentMaxWidth}" y2="${cursorY}" stroke="${config.borderColor}" stroke-width="1" />`
        );
        cursorY += 14;
      } else {
        cursorY += 8;
      }
      continue;
    }

    if (block.type === 'paragraph') {
      const wrappedLines = wrapInlineTokens(block.tokens, contentMaxWidth, baseFontSize);
      for (const lineTokens of wrappedLines) {
        cursorY += baseFontSize;
        const tspans = renderInlineTokensToTspans(
          lineTokens,
          config,
          config.textColor,
          stats
        );
        svgElements.push(
          `<text x="${contentX}" y="${cursorY}" font-family="${escapeXml(SANS_FONT_FAMILY)}" font-size="${baseFontSize}" fill="${config.textColor}">${tspans}</text>`
        );
        cursorY += baseLineHeightPx - baseFontSize;
      }
      cursorY += 12;
      continue;
    }

    if (block.type === 'blockquote') {
      const quotePaddingX = 18;
      const quotePaddingY = 14;
      const quoteInnerWidth = contentMaxWidth - quotePaddingX * 2;
      const wrappedQuoteLines: InlineToken[][] = [];

      for (const qLine of block.lines) {
        const wrapped = wrapInlineTokens(qLine, quoteInnerWidth, baseFontSize);
        wrappedQuoteLines.push(...wrapped);
      }

      const boxHeight =
        quotePaddingY * 2 + wrappedQuoteLines.length * baseLineHeightPx;
      const boxStartY = cursorY;

      // Quote background and accent bar
      svgElements.push(
        `<rect x="${contentX}" y="${boxStartY}" width="${contentMaxWidth}" height="${boxHeight}" rx="8" fill="${config.blockquoteBg}" />`
      );
      svgElements.push(
        `<rect x="${contentX}" y="${boxStartY}" width="4" height="${boxHeight}" rx="2" fill="${config.blockquoteBorderColor}" />`
      );

      let qY = boxStartY + quotePaddingY;
      for (const lineTokens of wrappedQuoteLines) {
        qY += baseFontSize;
        const tspans = renderInlineTokensToTspans(
          lineTokens,
          config,
          config.mutedColor,
          stats
        );
        svgElements.push(
          `<text x="${contentX + quotePaddingX}" y="${qY}" font-family="${escapeXml(SANS_FONT_FAMILY)}" font-size="${baseFontSize}" fill="${config.mutedColor}">${tspans}</text>`
        );
        qY += baseLineHeightPx - baseFontSize;
      }

      cursorY = boxStartY + boxHeight + 16;
      continue;
    }

    if (block.type === 'list') {
      for (const item of block.items) {
        const indentOffset = item.indent * 22;
        const markerWidth = 24;
        const itemTextX = contentX + indentOffset + markerWidth;
        const itemMaxWidth = contentMaxWidth - indentOffset - markerWidth;
        const wrappedItemLines = wrapInlineTokens(
          item.tokens,
          itemMaxWidth,
          baseFontSize
        );

        const firstLineBaselineY = cursorY + baseFontSize;
        const markerX = contentX + indentOffset;

        if (item.checked !== null) {
          // Task list checkbox vector icon
          const boxSize = 14;
          const boxY = firstLineBaselineY - boxSize + 2;
          if (item.checked) {
            svgElements.push(
              `<rect x="${markerX}" y="${boxY}" width="${boxSize}" height="${boxSize}" rx="3.5" fill="${config.boldColor}" />`
            );
            svgElements.push(
              `<path d="M ${markerX + 3.5} ${boxY + 7} L ${markerX + 6} ${boxY + 10} L ${markerX + 10.5} ${boxY + 4.5}" stroke="#FFFFFF" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />`
            );
          } else {
            svgElements.push(
              `<rect x="${markerX}" y="${boxY}" width="${boxSize}" height="${boxSize}" rx="3.5" fill="none" stroke="${config.mutedColor}" stroke-width="1.5" />`
            );
          }
        } else if (block.ordered) {
          svgElements.push(
            `<text x="${markerX}" y="${firstLineBaselineY}" font-family="${escapeXml(MONO_FONT_FAMILY)}" font-size="${Math.round(baseFontSize * 0.9)}" font-weight="600" fill="${config.boldColor}">${item.index}.</text>`
          );
        } else {
          const bulletY = firstLineBaselineY - Math.round(baseFontSize * 0.34);
          svgElements.push(
            `<circle cx="${markerX + 6}" cy="${bulletY}" r="3.2" fill="${config.boldColor}" />`
          );
        }

        for (const lineTokens of wrappedItemLines) {
          cursorY += baseFontSize;
          const tspans = renderInlineTokensToTspans(
            lineTokens,
            config,
            config.textColor,
            stats
          );
          svgElements.push(
            `<text x="${itemTextX}" y="${cursorY}" font-family="${escapeXml(SANS_FONT_FAMILY)}" font-size="${baseFontSize}" fill="${config.textColor}">${tspans}</text>`
          );
          cursorY += baseLineHeightPx - baseFontSize;
        }
        cursorY += 4;
      }
      cursorY += 10;
      continue;
    }

    if (block.type === 'codeblock') {
      stats.codeBlockCount++;
      const codeFontSize = Math.max(12, Math.round(baseFontSize * 0.82));
      const codeLineHeight = Math.round(codeFontSize * 1.65);
      const headerHeight = config.showCodeMacHeader ? 36 : 0;
      const codePadY = 16;
      const codePadX = 18;
      const lineNumGutterWidth = config.showCodeLineNumbers ? 32 : 0;

      const codeLineCount = Math.max(1, block.lines.length);
      const blockHeight =
        headerHeight + codePadY * 2 + codeLineCount * codeLineHeight;
      const blockStartY = cursorY;

      // Code Block Outer Container
      svgElements.push(
        `<rect x="${contentX}" y="${blockStartY}" width="${contentMaxWidth}" height="${blockHeight}" rx="10" fill="${config.codeBlockBg}" stroke="${config.codeBlockBorder}" stroke-width="1" data-block="codeblock" />`
      );

      // Header Bar with macOS window controls & language label
      if (config.showCodeMacHeader) {
        const dotY = blockStartY + 18;
        svgElements.push(
          `<circle cx="${contentX + 18}" cy="${dotY}" r="5.5" fill="#EF4444" />`,
          `<circle cx="${contentX + 36}" cy="${dotY}" r="5.5" fill="#F59E0B" />`,
          `<circle cx="${contentX + 54}" cy="${dotY}" r="5.5" fill="#10B981" />`
        );
        if (block.lang && block.lang !== 'text') {
          svgElements.push(
            `<text x="${contentX + contentMaxWidth - 16}" y="${dotY + 4}" text-anchor="end" font-family="${escapeXml(MONO_FONT_FAMILY)}" font-size="11" fill="${config.syntaxComment}">${escapeXml(block.lang.toUpperCase())}</text>`
          );
        }
        svgElements.push(
          `<line x1="${contentX}" y1="${blockStartY + headerHeight}" x2="${contentX + contentMaxWidth}" y2="${blockStartY + headerHeight}" stroke="${config.codeBlockBorder}" stroke-width="1" />`
        );
      }

      // Render each code line with syntax highlighting
      let codeY = blockStartY + headerHeight + codePadY;
      const maxCodeChars = Math.floor(
        (contentMaxWidth - codePadX * 2 - lineNumGutterWidth) /
          (codeFontSize * 0.54)
      );

      for (let lineIdx = 0; lineIdx < block.lines.length; lineIdx++) {
        codeY += codeFontSize;

        if (config.showCodeLineNumbers) {
          svgElements.push(
            `<text x="${contentX + codePadX + 18}" y="${codeY}" text-anchor="end" font-family="${escapeXml(MONO_FONT_FAMILY)}" font-size="${codeFontSize}" fill="${config.syntaxComment}" opacity="0.65">${lineIdx + 1}</text>`
          );
        }

        const lineTokens = block.lines[lineIdx];
        let charCount = 0;
        const codeTspans: string[] = [];

        for (const ct of lineTokens) {
          if (charCount >= maxCodeChars) break;
          let textSlice = ct.text;
          if (charCount + textSlice.length > maxCodeChars) {
            textSlice = textSlice.slice(0, maxCodeChars - charCount) + '…';
          }
          charCount += ct.text.length;

          const colorMap: Record<CodeToken['type'], string> = {
            keyword: config.syntaxKeyword,
            string: config.syntaxString,
            comment: config.syntaxComment,
            number: config.syntaxNumber,
            function: config.syntaxFunction,
            type: config.syntaxType,
            operator: config.syntaxOperator,
            plain: config.codeBlockText,
          };
          const tokenColor = colorMap[ct.type] || config.codeBlockText;
          codeTspans.push(
            `<tspan fill="${tokenColor}" data-syntax="${ct.type}">${escapeXml(textSlice)}</tspan>`
          );
        }

        svgElements.push(
          `<text x="${contentX + codePadX + lineNumGutterWidth}" y="${codeY}" xml:space="preserve" font-family="${escapeXml(MONO_FONT_FAMILY)}" font-size="${codeFontSize}" fill="${config.codeBlockText}">${codeTspans.join('')}</text>`
        );

        codeY += codeLineHeight - codeFontSize;
      }

      cursorY = blockStartY + blockHeight + 18;
      continue;
    }

    if (block.type === 'table') {
      const colCount = Math.max(1, block.headers.length);
      const colWidth = contentMaxWidth / colCount;
      const rowHeight = Math.round(baseFontSize * 2.35);
      const tableStartY = cursorY;
      const totalRows = 1 + block.rows.length;
      const tableHeight = totalRows * rowHeight;

      // Table outer border and header background
      svgElements.push(
        `<rect x="${contentX}" y="${tableStartY}" width="${contentMaxWidth}" height="${tableHeight}" rx="8" fill="none" stroke="${config.borderColor}" stroke-width="1" />`
      );
      svgElements.push(
        `<rect x="${contentX}" y="${tableStartY}" width="${contentMaxWidth}" height="${rowHeight}" rx="8" fill="${config.blockquoteBg}" />`
      );

      // Header cells
      for (let c = 0; c < colCount; c++) {
        const cellX = contentX + c * colWidth + 14;
        const cellBaselineY = tableStartY + Math.round(rowHeight * 0.64);
        const headerTspans = renderInlineTokensToTspans(
          block.headers[c] || [],
          config,
          config.headingColor,
          stats
        );
        svgElements.push(
          `<text x="${cellX}" y="${cellBaselineY}" font-family="${escapeXml(SANS_FONT_FAMILY)}" font-size="${Math.round(baseFontSize * 0.92)}" font-weight="600" fill="${config.headingColor}">${headerTspans}</text>`
        );
      }

      // Data rows
      for (let r = 0; r < block.rows.length; r++) {
        const rowY = tableStartY + (r + 1) * rowHeight;
        svgElements.push(
          `<line x1="${contentX}" y1="${rowY}" x2="${contentX + contentMaxWidth}" y2="${rowY}" stroke="${config.borderColor}" stroke-width="1" />`
        );

        const rowCells = block.rows[r];
        for (let c = 0; c < colCount; c++) {
          const cellX = contentX + c * colWidth + 14;
          const cellBaselineY = rowY + Math.round(rowHeight * 0.64);
          const cellTspans = renderInlineTokensToTspans(
            rowCells[c] || [],
            config,
            config.textColor,
            stats
          );
          svgElements.push(
            `<text x="${cellX}" y="${cellBaselineY}" font-family="${escapeXml(SANS_FONT_FAMILY)}" font-size="${Math.round(baseFontSize * 0.92)}" fill="${config.textColor}">${cellTspans}</text>`
          );
        }
      }

      cursorY = tableStartY + tableHeight + 18;
      continue;
    }

    if (block.type === 'hr') {
      cursorY += 8;
      svgElements.push(
        `<line x1="${contentX}" y1="${cursorY}" x2="${contentX + contentMaxWidth}" y2="${cursorY}" stroke="${config.borderColor}" stroke-width="1.5" stroke-dasharray="4 4" />`
      );
      cursorY += 20;
      continue;
    }
  }

  // Optional Semantic Color Legend Footer inside the SVG card
  if (config.showColorLegend) {
    cursorY += 10;
    svgElements.push(
      `<line x1="${contentX}" y1="${cursorY}" x2="${contentX + contentMaxWidth}" y2="${cursorY}" stroke="${config.borderColor}" stroke-width="1" />`
    );
    cursorY += 24;

    const legendY = cursorY;
    const legendFontSize = 12;

    // Bold color indicator
    svgElements.push(
      `<rect x="${contentX}" y="${legendY - 9}" width="10" height="10" rx="2.5" fill="${config.boldColor}" />`,
      `<text x="${contentX + 16}" y="${legendY}" font-family="${escapeXml(SANS_FONT_FAMILY)}" font-size="${legendFontSize}" fill="${config.mutedColor}">加粗映射 (${config.boldColor})</text>`
    );

    // Italic color indicator
    const italicLegendX = contentX + 175;
    svgElements.push(
      `<rect x="${italicLegendX}" y="${legendY - 9}" width="10" height="10" rx="2.5" fill="${config.italicColor}" />`,
      `<text x="${italicLegendX + 16}" y="${legendY}" font-family="${escapeXml(SANS_FONT_FAMILY)}" font-size="${legendFontSize}" fill="${config.mutedColor}">斜体映射 (${config.italicColor})</text>`
    );

    // Inline Code color indicator
    const codeLegendX = contentX + 350;
    svgElements.push(
      `<rect x="${codeLegendX}" y="${legendY - 9}" width="10" height="10" rx="2.5" fill="${config.inlineCodeColor}" />`,
      `<text x="${codeLegendX + 16}" y="${legendY}" font-family="${escapeXml(SANS_FONT_FAMILY)}" font-size="${legendFontSize}" fill="${config.mutedColor}">行内代码 (${config.inlineCodeColor})</text>`
    );

    cursorY += 12;
  }

  const cardHeight = Math.max(160, cursorY - cardY + config.padding - 8);
  const totalHeight = cardHeight + outerMargin * 2;

  const shadowDef = config.showCardShadow
    ? `<defs>
    <filter id="card-shadow" x="-5%" y="-3%" width="110%" height="108%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0F172A" flood-opacity="0.08" />
    </filter>
  </defs>`
    : '';

  const filterAttr = config.showCardShadow ? ' filter="url(#card-shadow)"' : '';

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${config.width}" height="${totalHeight}" viewBox="0 0 ${config.width} ${totalHeight}">
  ${shadowDef}
  <rect width="${config.width}" height="${totalHeight}" fill="${config.backgroundColor}" />
  <rect x="${cardX}" y="${cardY}" width="${cardWidth}" height="${cardHeight}" rx="${config.borderRadius}" fill="${config.cardBackground}" stroke="${config.borderColor}" stroke-width="1"${filterAttr} />
  ${svgElements.join('\n  ')}
</svg>`;

  return {
    svgString,
    width: config.width,
    height: totalHeight,
    blockCount: blocks.length,
    stats,
  };
}
