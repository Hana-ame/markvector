import React, { useRef } from 'react';
import { SvgThemeConfig } from '../utils/markdownToSvg';

interface MarkdownEditorPaneProps {
  markdown: string;
  onChangeMarkdown: (val: string) => void;
  config: SvgThemeConfig;
  onRestoreDefault: () => void;
}

export const MarkdownEditorPane: React.FC<MarkdownEditorPaneProps> = ({
  markdown,
  onChangeMarkdown,
  config,
  onRestoreDefault,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const insertSnippet = (prefix: string, suffix = '', defaultText = '') => {
    const el = textareaRef.current;
    if (!el) {
      onChangeMarkdown(markdown + '\n' + prefix + defaultText + suffix);
      return;
    }

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = markdown.slice(start, end) || defaultText;
    const replacement = `${prefix}${selected}${suffix}`;
    const nextValue =
      markdown.slice(0, start) + replacement + markdown.slice(end);

    onChangeMarkdown(nextValue);

    requestAnimationFrame(() => {
      el.focus();
      const cursorStart = start + prefix.length;
      const cursorEnd = cursorStart + selected.length;
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const lineCount = markdown ? markdown.split('\n').length : 0;
  const charCount = markdown.length;

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 min-h-[480px]">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200 min-h-[44px]">
        <div className="flex flex-wrap items-center gap-0.5">
          <button
            type="button"
            onClick={() => insertSnippet('## ', '', '章节小标题')}
            className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('**', '**', '加粗彩色重点')}
            className="px-2 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:bg-slate-200/70"
            style={{ color: config.boldColor }}
            title="插入加粗语法（将映射为加粗代替色）"
          >
            **加粗色**
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('*', '*', '斜体彩色术语')}
            className="px-2 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:bg-slate-200/70"
            style={{ color: config.italicColor }}
            title="插入斜体语法（将映射为斜体代替色）"
          >
            *斜体色*
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('***', '***', '粗斜复合重点')}
            className="px-2 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:bg-slate-200/70"
            style={{ color: config.boldItalicColor }}
            title="插入粗斜体复合语法"
          >
            ***复合色***
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('`', '`', 'inlineCode()')}
            className="px-2 py-1 text-xs font-mono font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:bg-slate-200/70"
            style={{ color: config.inlineCodeColor }}
          >
            `代码`
          </button>
          <button
            type="button"
            onClick={() =>
              insertSnippet(
                '\n```typescript\n',
                '\n```\n',
                'function greet(name: string): string {\n  return `Hello, ${name}`;\n}'
              )
            }
            className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            代码块
          </button>
          <button
            type="button"
            onClick={() =>
              insertSnippet('\n> ', '\n', '引用段落支持 **加粗色** 与 *斜体色* 嵌套。')
            }
            className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            引用
          </button>
          <button
            type="button"
            onClick={() =>
              insertSnippet(
                '\n| 字段名 | 类型 | 说明 |\n| :--- | :--- | :--- |\n| **id** | `string` | *主键标识* |\n',
                ''
              )
            }
            className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            表格
          </button>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1 tabular-nums">
            <span>{lineCount} 行</span>
            <span aria-hidden="true">·</span>
            <span>{charCount} 字</span>
          </div>
          {markdown.trim().length > 0 ? (
            <button
              type="button"
              onClick={() => onChangeMarkdown('')}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              清空
            </button>
          ) : (
            <button
              type="button"
              onClick={onRestoreDefault}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              恢复示例
            </button>
          )}
        </div>
      </div>

      {/* Markdown Textarea */}
      <div className="relative flex-1 flex flex-col">
        <label htmlFor="markdown-editor-textarea" className="sr-only">
          Markdown 源码编辑器
        </label>
        <textarea
          id="markdown-editor-textarea"
          ref={textareaRef}
          value={markdown}
          onChange={(e) => onChangeMarkdown(e.target.value)}
          placeholder="在此输入或粘贴 Markdown 内容... 使用 **文本** 触发加粗颜色替代，使用 *文本* 触发斜体颜色替代，使用 ```lang 渲染语法高亮代码块。"
          spellCheck={false}
          className="flex-1 w-full p-5 font-mono text-sm leading-relaxed text-slate-800 bg-white resize-none focus:outline-none selection:bg-blue-100"
        />
      </div>
    </div>
  );
};
