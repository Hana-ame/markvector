import { useMemo, useState } from 'react';
import { TopBar } from './components/TopBar';
import { StyleControlBar } from './components/StyleControlBar';
import { MarkdownEditorPane } from './components/MarkdownEditorPane';
import { SvgPreviewPane } from './components/SvgPreviewPane';
import {
  renderMarkdownToSvg,
  SvgThemeConfig,
  THEME_PRESETS,
} from './utils/markdownToSvg';
import { MARKDOWN_TEMPLATES } from './utils/templates';

export default function App() {
  const [activeTemplateId, setActiveTemplateId] = useState<string>(
    MARKDOWN_TEMPLATES[0].id
  );
  const [markdown, setMarkdown] = useState<string>(
    MARKDOWN_TEMPLATES[0].content
  );
  const [config, setConfig] = useState<SvgThemeConfig>(
    THEME_PRESETS.editorialLight
  );
  const [viewMode, setViewMode] = useState<'preview' | 'source'>('preview');

  const renderResult = useMemo(
    () => renderMarkdownToSvg(markdown, config),
    [markdown, config]
  );

  const handleSelectTemplate = (templateId: string) => {
    const found = MARKDOWN_TEMPLATES.find((t) => t.id === templateId);
    if (found) {
      setActiveTemplateId(found.id);
      setMarkdown(found.content);
      setViewMode('preview');
    }
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = THEME_PRESETS[presetId];
    if (preset) {
      setConfig((prev) => ({
        ...preset,
        width: prev.width,
        fontSize: prev.fontSize,
        keepBoldWeight: prev.keepBoldWeight,
        keepItalicStyle: prev.keepItalicStyle,
        showCodeLineNumbers: prev.showCodeLineNumbers,
        showColorLegend: prev.showColorLegend,
      }));
    }
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([renderResult.svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `markvector-${activeTemplateId}-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadStandaloneHtml = () => {
    const htmlContent = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MarkVector SVG 导出视图</title>
  <style>
    body {
      margin: 0;
      padding: 32px 16px;
      background: ${config.backgroundColor};
      display: flex;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
    }
    .svg-wrapper {
      max-width: 100%;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <div class="svg-wrapper">
    ${renderResult.svgString}
  </div>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `markvector-standalone-${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 1. Strict 3-Zone Top Bar */}
      <TopBar
        activeTemplateId={activeTemplateId}
        onSelectTemplate={handleSelectTemplate}
        viewMode={viewMode}
        onToggleViewMode={() =>
          setViewMode((m) => (m === 'preview' ? 'source' : 'preview'))
        }
        onDownloadSvg={handleDownloadSvg}
      />

      {/* 2. Semantic Color Mapping & Style Control Bar */}
      <StyleControlBar
        config={config}
        onChangeConfig={setConfig}
        onSelectPreset={handleSelectPreset}
      />

      {/* 3. Main Split Studio Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-116px)]">
        <div className="lg:col-span-5 flex flex-col h-full">
          <MarkdownEditorPane
            markdown={markdown}
            onChangeMarkdown={setMarkdown}
            config={config}
            onRestoreDefault={() =>
              handleSelectTemplate(MARKDOWN_TEMPLATES[0].id)
            }
          />
        </div>
        <div className="lg:col-span-7 flex flex-col h-full">
          <SvgPreviewPane
            renderResult={renderResult}
            config={config}
            isEmpty={markdown.trim().length === 0}
            viewMode={viewMode}
            onSetViewMode={setViewMode}
            onRestoreDefault={() =>
              handleSelectTemplate(MARKDOWN_TEMPLATES[0].id)
            }
            onDownloadSvg={handleDownloadSvg}
            onDownloadStandaloneHtml={handleDownloadStandaloneHtml}
          />
        </div>
      </main>
    </div>
  );
}
