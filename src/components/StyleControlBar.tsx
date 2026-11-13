import React from 'react';
import { SvgThemeConfig, THEME_PRESETS } from '../utils/markdownToSvg';

interface StyleControlBarProps {
  config: SvgThemeConfig;
  onChangeConfig: (updater: (prev: SvgThemeConfig) => SvgThemeConfig) => void;
  onSelectPreset: (presetId: string) => void;
}

const BOLD_SWATCHES = ['#E11D48', '#2563EB', '#D97706', '#DC2626', '#7C3AED', '#FB7185'];
const ITALIC_SWATCHES = ['#0284C7', '#059669', '#7C3AED', '#0F766E', '#38BDF8', '#EA580C'];

export const StyleControlBar: React.FC<StyleControlBarProps> = ({
  config,
  onChangeConfig,
  onSelectPreset,
}) => {
  return (
    <section
      aria-label="SVG 色彩映射与版式参数设置"
      className="bg-white border-b border-slate-200 px-6 py-2.5"
    >
      <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6">
        {/* Group 1: Theme Presets */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            主题风格
          </span>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {Object.values(THEME_PRESETS).map((preset) => {
              const active = config.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {preset.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Group 2: Bold & Italic Color Replacement Controls (Core Feature) */}
        <div className="flex flex-wrap items-center gap-5">
          {/* Bold Color Control */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="bold-color-input"
              className="text-xs font-semibold text-slate-700 whitespace-nowrap flex items-center gap-1.5"
            >
              <span>加粗代替色</span>
              <code className="text-[11px] font-mono text-slate-400">**B**</code>
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="bold-color-input"
                type="color"
                aria-label="加粗文本替代颜色"
                value={config.boldColor}
                onChange={(e) =>
                  onChangeConfig((prev) => ({ ...prev, boldColor: e.target.value }))
                }
                className="w-6 h-6 rounded border border-slate-300 cursor-pointer bg-transparent p-0"
              />
              <span className="text-xs font-mono tabular-nums text-slate-600 uppercase w-16">
                {config.boldColor}
              </span>
              <div className="hidden xl:flex items-center gap-1">
                {BOLD_SWATCHES.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    aria-label={`设置加粗颜色为 ${hex}`}
                    onClick={() =>
                      onChangeConfig((prev) => ({ ...prev, boldColor: hex }))
                    }
                    className={`w-4 h-4 rounded-sm border transition-transform cursor-pointer ${
                      config.boldColor.toUpperCase() === hex
                        ? 'scale-110 border-slate-900'
                        : 'border-black/10 hover:scale-105'
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          <span className="text-slate-200 select-none" aria-hidden="true">|</span>

          {/* Italic Color Control */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="italic-color-input"
              className="text-xs font-semibold text-slate-700 whitespace-nowrap flex items-center gap-1.5"
            >
              <span>斜体代替色</span>
              <code className="text-[11px] font-mono text-slate-400">*I*</code>
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="italic-color-input"
                type="color"
                aria-label="斜体文本替代颜色"
                value={config.italicColor}
                onChange={(e) =>
                  onChangeConfig((prev) => ({ ...prev, italicColor: e.target.value }))
                }
                className="w-6 h-6 rounded border border-slate-300 cursor-pointer bg-transparent p-0"
              />
              <span className="text-xs font-mono tabular-nums text-slate-600 uppercase w-16">
                {config.italicColor}
              </span>
              <div className="hidden xl:flex items-center gap-1">
                {ITALIC_SWATCHES.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    aria-label={`设置斜体颜色为 ${hex}`}
                    onClick={() =>
                      onChangeConfig((prev) => ({ ...prev, italicColor: hex }))
                    }
                    className={`w-4 h-4 rounded-sm border transition-transform cursor-pointer ${
                      config.italicColor.toUpperCase() === hex
                        ? 'scale-110 border-slate-900'
                        : 'border-black/10 hover:scale-105'
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          <span className="text-slate-200 select-none" aria-hidden="true">|</span>

          {/* Inline Code Color Control */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="code-color-input"
              className="text-xs font-semibold text-slate-700 whitespace-nowrap"
            >
              行内代码色
            </label>
            <input
              id="code-color-input"
              type="color"
              aria-label="行内代码颜色"
              value={config.inlineCodeColor}
              onChange={(e) =>
                onChangeConfig((prev) => ({
                  ...prev,
                  inlineCodeColor: e.target.value,
                }))
              }
              className="w-6 h-6 rounded border border-slate-300 cursor-pointer bg-transparent p-0"
            />
          </div>
        </div>

        {/* Group 3: Layout & Mode Options */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <label htmlFor="svg-width-select" className="font-medium text-slate-500 whitespace-nowrap">
              画布宽度
            </label>
            <select
              id="svg-width-select"
              value={config.width}
              onChange={(e) =>
                onChangeConfig((prev) => ({
                  ...prev,
                  width: Number(e.target.value),
                }))
              }
              className="bg-slate-100 border border-slate-200 rounded-md px-2 py-1 text-xs font-mono tabular-nums text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={640}>640 px</option>
              <option value={760}>760 px</option>
              <option value={880}>880 px</option>
              <option value={1024}>1024 px</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <label htmlFor="svg-fontsize-select" className="font-medium text-slate-500 whitespace-nowrap">
              正文字号
            </label>
            <select
              id="svg-fontsize-select"
              value={config.fontSize}
              onChange={(e) =>
                onChangeConfig((prev) => ({
                  ...prev,
                  fontSize: Number(e.target.value),
                }))
              }
              className="bg-slate-100 border border-slate-200 rounded-md px-2 py-1 text-xs font-mono tabular-nums text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={14}>14 px</option>
              <option value={16}>16 px</option>
              <option value={18}>18 px</option>
              <option value={20}>20 px</option>
            </select>
          </div>

          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap">
            <input
              type="checkbox"
              checked={config.keepBoldWeight}
              onChange={(e) =>
                onChangeConfig((prev) => ({
                  ...prev,
                  keepBoldWeight: e.target.checked,
                }))
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>叠加粗体字重</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap">
            <input
              type="checkbox"
              checked={config.keepItalicStyle}
              onChange={(e) =>
                onChangeConfig((prev) => ({
                  ...prev,
                  keepItalicStyle: e.target.checked,
                }))
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>叠加斜体倾斜</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap">
            <input
              type="checkbox"
              checked={config.showCodeLineNumbers}
              onChange={(e) =>
                onChangeConfig((prev) => ({
                  ...prev,
                  showCodeLineNumbers: e.target.checked,
                }))
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>代码行号</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap">
            <input
              type="checkbox"
              checked={config.showColorLegend}
              onChange={(e) =>
                onChangeConfig((prev) => ({
                  ...prev,
                  showColorLegend: e.target.checked,
                }))
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>底部色彩图例</span>
          </label>
        </div>
      </div>
    </section>
  );
};
