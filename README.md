# Shouqianba Developer Center Revamp Prototype

收钱吧开发者中心改版原型项目。

## 项目目标

本项目的目标是把开发者站从“接口目录导向”改成“接入路径导向”，优先解决服务商 / ISV 技术团队首次接入时的效率问题。

核心目标：

- 让新用户在首页快速判断接入路线。
- 先进入对应 Quickstart，再进入 API、FAQ、验收资料。
- 保持信息架构清晰稳定，同时让视觉风格贴近收钱吧品牌。

## 设计原则

本原型按以下原则落地：

- 信息架构：接入导航型首页（5 条主分流）
- 路径顺序：Route Selection -> Quickstart -> Deep Docs
- 搜索优先级：场景词和路线页优先于底层 API 条目
- 视觉策略：仅借鉴收钱吧官网配色和控件质感，不改主结构

5 条主分流：

1. 线下门店收款
2. 线上与移动端支付
3. 小程序支付
4. 商户入网与分账
5. 开放能力与通知

## 架构说明

这是一个前端单页原型应用，主要用于信息架构和交互路径验证。

- Framework: React + TypeScript + Vite
- Routing: React Router
- Unit Test: Vitest
- E2E Test: Playwright

页面层级：

- `HomePage`：首屏引导、5 条分流、Quickstart 路径说明、常用直达入口
- `RoutePage`：单条路线详情模板（Quickstart 步骤 + 相关入口 + 代表场景）

数据层：

- `src/data/routes.ts`：路线结构、关键词、Quickstart 步骤、直达链接
- `src/utils/search.ts`：场景词优先的搜索排序逻辑

## 目录结构

```text
.
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ pages/
│  ├─ styles/
│  └─ utils/
├─ tests/
│  ├─ unit/
│  └─ e2e/
├─ config/
├─ docs/
│  ├─ sqb/           # 业务资料文档归档
│  └─ superpowers/   # 设计与计划文档
└─ package.json
```

## 本地运行

```bash
npm install
npm run dev
```

默认地址：`http://localhost:4173/`

## 验证命令

```bash
npm run test
npm run test:e2e
npm run build
```

## 备注

- 资料类 PDF/XLSX 已统一整理到 `docs/sqb/`。
- 本仓库当前以原型验证为主，不包含后端服务或生产部署流水线。
