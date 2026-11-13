import React from 'react';
import { MARKDOWN_TEMPLATES } from '../utils/templates';

interface TopBarProps {
  activeTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  viewMode: 'preview' | 'source';
  onToggleViewMode: () => void;
  onDownloadSvg: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTemplateId,
  onSelectTemplate,
  viewMode,
  onToggleViewMode,
  onDownloadSvg,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onSelectTemplate(MARKDOWN_TEMPLATES[0].id);
        }}
        className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
      >
        MarkVector
      </a>

      {/* Zone 2: 4 concise single-line text navigation links */}
      <nav aria-label="预设模板与视图切换" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        {MARKDOWN_TEMPLATES.map((tpl) => {
          const isActive = activeTemplateId === tpl.id && viewMode === 'preview';
          return (
            <a
              key={tpl.id}
              href={`#${tpl.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectTemplate(tpl.id);
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-0.5 ${
                isActive
                  ? 'text-slate-900 underline underline-offset-8 decoration-2 decoration-blue-600 font-semibold'
                  : 'hover:text-slate-900 hover:underline hover:underline-offset-8'
              }`}
            >
              {tpl.label}
            </a>
          );
        })}
        <a
          href="#svg-source"
          onClick={(e) => {
            e.preventDefault();
            onToggleViewMode();
          }}
          className={`transition-colors whitespace-nowrap shrink-0 py-0.5 ${
            viewMode === 'source'
              ? 'text-slate-900 underline underline-offset-8 decoration-2 decoration-blue-600 font-semibold'
              : 'hover:text-slate-900 hover:underline hover:underline-offset-8'
          }`}
        >
          {viewMode === 'source' ? '返回画布预览' : 'SVG 源码检视'}
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onDownloadSvg}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          下载 SVG 文件
        </button>
      </div>
    </header>
  );
};
