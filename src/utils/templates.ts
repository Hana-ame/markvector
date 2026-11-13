export interface MarkdownTemplate {
  id: string;
  label: string;
  description: string;
  content: string;
}

export const MARKDOWN_TEMPLATES: MarkdownTemplate[] = [
  {
    id: 'showcase',
    label: '综合排版示例',
    description: '包含色彩替代加粗/斜体、代码高亮、表格与任务列表',
    content: `# Markdown 转 SVG 矢量排版引擎

在纯矢量 SVG 渲染场景中，传统字体字重与斜体往往受限于系统字库。本工具将 **加粗语法 (Bold)** 与 *斜体语法 (Italic)* 自动映射为高辨识度的 **独立语义色彩**，兼顾视觉层次与跨平台一致性。

## 1. 语义色彩映射规则

- **加粗文本 (\`**重点**\`)**：默认映射为醒目的 **强调主色**，无需依赖字重加粗即可一眼锁定核心结论。
- *斜体文本 (\`*术语*\`)*：默认映射为清澈的 *辅助对比色*，解决中文无原生斜体与西文斜体锯齿问题。
- ***粗斜复合 (\`***警示***\`)***：映射为第三种 ***高优琥珀色***，适合标注关键阈值与边界条件。
- 行内代码如 \`renderToSvg(ast, config)\` 则采用等宽字体与独立代码着色。

> 排版建议：在知识卡片、技术长图与架构注解中，**色彩对比度** 比单纯的字重变化具有更高的阅读信噪比与 *视觉锚定效应*。

## 2. 语法高亮代码块渲染

\`\`\`typescript
interface VectorToken {
  kind: "bold" | "italic" | "code";
  color: string;
  content: string;
}

export function applyColorSemantics(tokens: VectorToken[]): string {
  // 将加粗与斜体转换为 SVG 原生 <tspan> 色彩属性
  return tokens
    .map((t) => \`<tspan fill="\${t.color}">\${t.content}</tspan>\`)
    .join("");
}
\`\`\`

## 3. 样式映射对照表与清单

| Markdown 语法 | 传统渲染方式 | 本工具 SVG 矢量方案 |
| :--- | :--- | :--- |
| **加粗语法** | 依赖字体 Bold 字重 | **独立高饱和度主色替代** |
| *斜体语法* | 几何倾斜易产生伪影 | *高辨识度冷色调替代* |
| \`行内代码\` | 普通等宽文本 | \`等宽字体 + 专属代码色\` |

- [x] 支持实时解析 Markdown 并生成独立矢量 \`<svg>\` 节点
- [x] 内置多语言代码块词法分析与语法着色
- [x] 支持自由定制 **加粗色值**、*斜体色值* 与一键导出 SVG / PNG`,
  },
  {
    id: 'code-card',
    label: '算法与代码卡片',
    description: '专注于代码语法高亮与复杂度分析的技术分享卡片',
    content: `# 快速幂与矩阵加速 (Fast Exponentiation)

在求解大规模递推数列时，利用 **二进制拆分** 思想可以将时间复杂度从线性阶降低至 *对数阶*，广泛应用于密码学与图论路径计数。

## 核心实现代码

\`\`\`python
def matrix_power(base: list, exp: int, mod: int) -> int:
    # 初始化单位结果与底数状态
    result = 1
    current = base % mod

    while exp > 0:
        if exp & 1 == 1:
            result = (result * current) % mod
        current = (current * current) % mod
        exp >>= 1

    return result
\`\`\`

## 复杂度与边界说明

1. **时间复杂度**：稳定收敛于 *O(log N)* 次乘法运算，显著优于朴素循环。
2. **空间复杂度**：仅需常数级辅助变量，内存占用为 *O(1)*。
3. ***溢出防护***：在 C++ 或 Rust 中务必在每次乘法前转为 \`uint64_t\` 或 \`u128\` 取模。`,
  },
  {
    id: 'tech-note',
    label: '架构设计备忘',
    description: '适合导出为公众号插图、技术文档或高管汇报卡片',
    content: `# 分布式缓存一致性保障策略

在高并发读写架构中，数据库与缓存的双写顺序直接决定了系统的 **最终一致性窗口** 与 *脏读风险概率*。

> 核心原则：优先采用 **Cache-Aside (旁路缓存)** 模式，以数据库持久化记录作为唯一可信源，通过 *先更新数据库、再删除缓存* 规避并发写冲突。

## 关键异常处理流程

- **缓存击穿防护**：对热点 Key 启用 *互斥锁 (Mutex)* 或 **逻辑过期时间**，防止瞬时流量直接打穿底层存储。
- **消息队列异步重试**：当 \`DEL cache_key\` 偶发失败时，投递至高可靠重试通道保障最终淘汰。

\`\`\`sql
-- 更新订单状态并记录乐观锁版本号
UPDATE orders
SET status = 'PAID', version = version + 1, updated_at = NOW()
WHERE order_id = 109482 AND version = 3;
\`\`\`

| 故障场景 | 触发原因 | 推荐应对机制 |
| :--- | :--- | :--- |
| **缓存雪崩** | 大批 Key 在同一时刻过期 | *打散 TTL 随机抖动值* |
| **缓存穿透** | 恶意请求不存在的 ID | **布隆过滤器 (Bloom Filter)** |`,
  },
];
