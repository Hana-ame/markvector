import test from 'node:test';
import assert from 'node:assert/strict';
import {
  tokenizeInline,
  tokenizeCodeLine,
  parseMarkdown,
  renderMarkdownToSvg,
  THEME_PRESETS,
} from './markdownToSvg';

test('tokenizeInline parses bold, italic, bold-italic, inline code, strike, and links', () => {
  const input =
    '正常文本 **加粗重点** 与 *斜体强调* 还有 ***粗斜复合*** 以及 `const x = 1` 和 ~~删除线~~ [链接](https://example.com)';
  const tokens = tokenizeInline(input);

  const boldToken = tokens.find((t) => t.type === 'bold');
  assert.ok(boldToken);
  assert.equal(boldToken.text, '加粗重点');

  const italicToken = tokens.find((t) => t.type === 'italic');
  assert.ok(italicToken);
  assert.equal(italicToken.text, '斜体强调');

  const boldItalicToken = tokens.find((t) => t.type === 'bold-italic');
  assert.ok(boldItalicToken);
  assert.equal(boldItalicToken.text, '粗斜复合');

  const codeToken = tokens.find((t) => t.type === 'code');
  assert.ok(codeToken);
  assert.equal(codeToken.text, 'const x = 1');

  const strikeToken = tokens.find((t) => t.type === 'strike');
  assert.ok(strikeToken);
  assert.equal(strikeToken.text, '删除线');

  const linkToken = tokens.find((t) => t.type === 'link');
  assert.ok(linkToken);
  assert.equal(linkToken.text, '链接');
  assert.equal(linkToken.url, 'https://example.com');
});

test('tokenizeCodeLine highlights keywords, functions, strings, numbers, and comments', () => {
  const line = 'export function calc(x: number) { return "ok" + 42; } // comment';
  const tokens = tokenizeCodeLine(line);

  assert.ok(tokens.some((t) => t.type === 'keyword' && t.text === 'export'));
  assert.ok(tokens.some((t) => t.type === 'keyword' && t.text === 'function'));
  assert.ok(tokens.some((t) => t.type === 'function' && t.text === 'calc'));
  assert.ok(tokens.some((t) => t.type === 'type' && t.text === 'number'));
  assert.ok(tokens.some((t) => t.type === 'string' && t.text === '"ok"'));
  assert.ok(tokens.some((t) => t.type === 'number' && t.text === '42'));
  assert.ok(tokens.some((t) => t.type === 'comment' && t.text.includes('// comment')));
});

test('renderMarkdownToSvg maps bold and italic to distinct fill colors instead of weight/slant by default', () => {
  const md = `# 标题演示\n\n这里包含 **红色加粗替代** 以及 *蓝色斜体替代*。\n\n\`\`\`ts\nconst a: number = 10;\n\`\`\``;
  const customConfig = {
    ...THEME_PRESETS.editorialLight,
    boldColor: '#FF1122',
    italicColor: '#0055FF',
    keepBoldWeight: false,
    keepItalicStyle: false,
  };

  const result = renderMarkdownToSvg(md, customConfig);

  assert.ok(result.svgString.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
  assert.ok(result.svgString.includes('fill="#FF1122" font-weight="500" data-token="bold">红色加粗替代</tspan>'));
  assert.ok(result.svgString.includes('fill="#0055FF" font-style="normal" data-token="italic">蓝色斜体替代</tspan>'));
  assert.equal(result.stats.boldCount, 1);
  assert.equal(result.stats.italicCount, 1);
  assert.equal(result.stats.codeBlockCount, 1);
});

test('parseMarkdown handles tables, blockquotes, and task lists accurately', () => {
  const md = `> 引用段落 **重点**\n\n- [x] 已完成任务\n- [ ] 待办任务\n\n| 语法 | 替代方案 |\n| :--- | :--- |\n| **加粗** | *色彩映射* |`;
  const blocks = parseMarkdown(md);

  assert.equal(blocks.length, 3);
  assert.equal(blocks[0].type, 'blockquote');
  assert.equal(blocks[1].type, 'list');
  if (blocks[1].type === 'list') {
    assert.equal(blocks[1].items[0].checked, true);
    assert.equal(blocks[1].items[1].checked, false);
  }
  assert.equal(blocks[2].type, 'table');
});
