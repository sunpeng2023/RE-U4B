# LIVING_IN_SPACE 项目

## 项目概述

这是一个基于 **Next.js 16** 构建的交互式 Web 演示文稿应用，主题为"Living in Space"（在太空生活）。这是一个现代化的在线教学课件，通过精美的视觉效果和流畅的动画交互，向学习者介绍人类太空探索、火星殖民、太空生存等相关知识。

**核心特性：**
- 18张精心设计的演示幻灯片，涵盖从月球探索到火星殖民的完整话题
- 使用 **Framer Motion** 实现流畅的页面切换和动画效果
- 响应式设计，支持键盘导航（左右箭头、空格键、退格键）
- 多种幻灯片布局：标题页、问答页、词汇检查、填空练习、讨论题等
- 精美的视觉效果：渐变背景、毛玻璃效果、高亮关键词、发光效果
- 支持步骤式内容展示，每张幻灯片分多个步骤逐步显示内容

**主要技术栈：**
- **前端框架**：Next.js 16.1.6 (App Router)
- **UI 框架**：React 19.2.3 + TypeScript
- **动画库**：Framer Motion 12.29.2
- **样式方案**：Tailwind CSS 4
- **图标库**：Lucide React
- **字体**：Google Fonts (Inter)

## 构建和运行

### 开发模式
```bash
npm run dev
```
启动开发服务器，访问 http://localhost:3000

### 生产构建
```bash
npm run build
```
构建生产版本，输出到 `.next` 目录

### 生产运行
```bash
npm run start
```
运行生产服务器（需先执行 `npm run build`）

### 代码检查
```bash
npm run lint
```
运行 ESLint 检查代码质量

## 开发约定

### 项目结构
```
/Users/sunpeng/Desktop/ppt/LIVING_IN_SPACE/
├── src/
│   └── app/
│       ├── page.tsx          # 主页面，包含所有幻灯片逻辑和布局
│       ├── layout.tsx        # 根布局组件
│       └── globals.css       # 全局样式（Tailwind CSS）
├── public/
│   └── images/               # 幻灯片背景图片（slide1.png ~ slide18.png）
├── package.json              # 项目依赖和脚本配置
├── tsconfig.json             # TypeScript 配置
├── next.config.ts            # Next.js 配置（启用 React Compiler）
└── eslint.config.mjs         # ESLint 配置
```

### 代码规范
- **TypeScript**：使用严格模式，所有类型必须明确定义
- **组件架构**：单文件组件结构，所有幻灯片逻辑在 `page.tsx` 中集中管理
- **状态管理**：使用 React Hooks (`useState`, `useEffect`) 管理幻灯片和步骤状态
- **样式方案**：优先使用 Tailwind CSS 工具类，避免内联样式
- **动画实现**：使用 Framer Motion 的 `AnimatePresence` 和 `motion` 组件
- **键盘事件**：支持方向键、空格键、退格键进行幻灯片导航

### 幻灯片数据结构
每张幻灯片使用 `Slide` 接口定义，包含以下属性：
- `id`: 幻灯片编号
- `bg`: 背景图片路径
- `layout`: 布局类型（title, questions, qa, vocabCheck, fillBlanks, history, predict, discussion, summary）
- `steps`: 内容显示步骤数
- 其他属性根据布局类型动态变化（title, subtitle, questions, facts, icon, question, answer, vocab, vocabList, wordBank 等）

### 设计风格
- **主色调**：深色背景（黑色）搭配橙色高亮
- **视觉效果**：毛玻璃（backdrop-blur）、渐变、发光、圆角设计
- **字体**：Inter 字体，大标题使用超大字号和粗体
- **关键词高亮**：使用橙色下划线和发光效果突出重点词汇
- **进度指示**：底部进度条和可点击的导航点

### React Compiler
项目已启用 React Compiler（通过 `next.config.ts` 配置），该编译器会自动优化 React 组件性能，开发者无需手动使用 `useMemo`、`useCallback` 等优化 Hook。

## 文件说明

### 关键文件
- **src/app/page.tsx**: 核心文件，包含完整的幻灯片数据、交互逻辑和渲染逻辑
- **src/app/layout.tsx**: 应用根布局，配置元数据和字体
- **src/app/globals.css**: 全局样式和 Tailwind CSS 配置
- **package.json**: 依赖管理，项目名称为 "web-ppt"

### 静态资源
- **public/images/**: 包含 18 张 PNG 格式的幻灯片背景图片，文件名为 `slide1.png` 到 `slide18.png`

## 幻灯片布局类型

1. **title**: 标题页，展示主标题、副标题和页脚信息
2. **questions**: 问题展示页，列出讨论问题
3. **qa**: 问答页，展示问题、答案和词汇解释
4. **vocabCheck**: 词汇检查页，展示中英文词汇对照
5. **fillBlanks**: 填空练习页，提供词库和填空题
6. **history**: 历史介绍页，展示事实卡片
7. **predict**: 预测讨论页，展示讨论任务和提示
8. **discussion**: 讨论页，展示讨论问题
9. **summary**: 总结页，展示要点和结束语

## 学习目标

本应用旨在帮助学习者：
- 了解人类太空探索的历史和现状
- 掌握与太空探索相关的英语词汇
- 通过互动式学习提高阅读理解能力
- 培养批判性思维和讨论能力