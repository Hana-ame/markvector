import React, { useState } from 'react';
import { SvgRenderResult, SvgThemeConfig } from '../utils/markdownToSvg';

interface SvgPreviewPaneProps {
  renderResult: SvgRenderResult;
  config: SvgThemeConfig;
  isEmpty: boolean;
  viewMode: 'preview' | 'source';
  onSetViewMode: (mode: 'preview' | 'source') => void;
  onRestoreDefault: () => void;
  onDownloadSvg: () => void;
  onDownloadStandaloneHtml: () => void;
}

export const SvgPreviewPane: React.FC<SvgPreviewPaneProps> = ({
  renderResult,
  config,
  isEmpty,
  viewMode,
  onSetViewMode,
  onRestoreDefault,
  onDownloadSvg,
  onDownloadStandaloneHtml,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [pngExporting, setPngExporting] = useState(false);

  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(renderResult.svgString);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      // Fallback copy via temporary textarea
      const temp = document.createElement('textarea');
      temp.value = renderResult.svgString;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const handleExportPng = () => {
    setPngExporting(true);
    const svgBlob = new Blob([renderResult.svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const scale = 2; // 2x Retina export
      const canvas = document.createElement('canvas');
      canvas.width = renderResult.width * scale;
      canvas.height = renderResult.height * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            const pngUrl = URL.createObjectURL(pngBlob);
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = `markvector-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(pngUrl);
          }
          setPngExporting(false);
        }, 'image/png');
      } else {
        setPngExporting(false);
      }
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      setPngExporting(false);
    };

    img.src = url;
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 min-h-[480px]">
      {/* Preview Sub-header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200 min-h-[44px]">
        {/* Left: Segmented View Switcher & Unboxed Telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 p-0.5 bg-slate-200/80 rounded-lg">
            <button
              type="button"
              onClick={() => onSetViewMode('preview')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              矢量画布
            </button>
            <button
              type="button"
              onClick={() => onSetViewMode('source')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'source'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SVG 源码
            </button>
          </div>

          {/* Unboxed clean metadata with typographic separators */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 tabular-nums whitespace-nowrap">
            <span>
              {renderResult.width}×{renderResult.height}
            </span>
            <span aria-hidden="true">·</span>
            <span>加粗 {renderResult.stats.boldCount}</span>
            <span aria-hidden="true">·</span>
            <span>斜体 {renderResult.stats.italicCount}</span>
            <span aria-hidden="true">·</span>
            <span>代码 {renderResult.stats.codeBlockCount}</span>
          </div>
        </div>

        {/* Right: Zoom & Export Actions */}
        <div className="flex items-center gap-1.5">
          {viewMode === 'preview' && !isEmpty && (
            <div className="flex items-center gap-0.5 mr-1 text-xs text-slate-600 tabular-nums">
              <button
                type="button"
                aria-label="缩小画布"
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                className="px-1.5 py-1 rounded hover:bg-slate-200/70 transition-colors cursor-pointer"
              >
                -
              </button>
              <button
                type="button"
                aria-label="重置缩放比例为 100%"
                onClick={() => setZoom(100)}
                className="px-1 py-1 rounded hover:bg-slate-200/70 font-mono transition-colors cursor-pointer"
              >
                {zoom}%
              </button>
              <button
                type="button"
                aria-label="放大画布"
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
                className="px-1.5 py-1 rounded hover:bg-slate-200/70 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleCopySvg}
            disabled={isEmpty}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copyStatus === 'copied' ? '已复制 SVG' : '复制 SVG'}
          </button>

          <button
            type="button"
            onClick={handleExportPng}
            disabled={isEmpty || pngExporting}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {pngExporting ? '导出中...' : '导出 PNG'}
          </button>

          <button
            type="button"
            onClick={onDownloadStandaloneHtml}
            disabled={isEmpty}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            导出 HTML
          </button>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="flex-1 overflow-auto svg-stage-grid p-6 flex justify-center items-start">
        {isEmpty ? (
          <div className="my-auto max-w-md w-full bg-white border border-slate-200 rounded-xl p-8 text-center">
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              等待输入 Markdown 内容
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-5">
              在左侧编辑器中输入标题、段落、代码块或表格，系统将实时生成纯矢量 SVG 节点，并使用自定义色彩代替传统加粗与斜体。
            </p>
            <button
              type="button"
              onClick={onRestoreDefault}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              加载默认排版示例
            </button>
          </div>
        ) : viewMode === 'preview' ? (
          <div
            data-testid="svg-preview-container"
            className="transition-transform origin-top duration-150"
            style={{
              transform: `scale(${zoom / 100})`,
              color: config.textColor,
            }}
            dangerouslySetInnerHTML={{ __html: renderResult.svgString }}
          />
        ) : (
          <div className="w-full max-w-4xl bg-slate-900 text-slate-100 rounded-xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2 font-mono tabular-nums">
                <span>output.svg</span>
                <span aria-hidden="true">·</span>
                <span>{new Blob([renderResult.svgString]).size} Bytes</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySvg}
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  {copyStatus === 'copied' ? '已复制' : '复制完整 XML'}
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={onDownloadSvg}
                  className="text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  下载 .svg
                </button>
              </div>
            </div>
            <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-slate-200 max-h-[680px]">
              <code>{renderResult.svgString}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
