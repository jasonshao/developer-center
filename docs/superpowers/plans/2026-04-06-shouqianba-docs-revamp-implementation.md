# Shouqianba Docs Revamp Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, runnable frontend prototype for the redesigned Shouqianba developer docs homepage and route pages in the current folder, based on the approved spec.

**Architecture:** Create a small Vite + React + TypeScript app with route-driven content, a homepage focused on five primary onboarding routes, and reusable route-detail templates. Keep content local in typed data files so information architecture, search ranking, and visual styling can evolve without a CMS.

**Tech Stack:** Vite, React, TypeScript, React Router, Vitest, Testing Library, Playwright, plain CSS

---

## Assumptions

- The current workspace is not a git repository, so this plan replaces commit steps with explicit verification checkpoints.
- The current workspace has no existing site code, so this plan creates a fresh prototype app inside the current folder.
- The prototype target is desktop + mobile responsive web, not a production deployment pipeline.

## File Structure

### Root setup

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `playwright.config.ts`

### Application shell

- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`

### Data and utilities

- Create: `src/data/routes.ts`
- Create: `src/utils/search.ts`

### UI components

- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/RouteCard.tsx`
- Create: `src/components/QuickstartSteps.tsx`
- Create: `src/components/DirectLinks.tsx`
- Create: `src/components/SiteFooter.tsx`

### Pages

- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/RoutePage.tsx`

### Tests

- Create: `src/test/setup.ts`
- Create: `tests/unit/routes.test.ts`
- Create: `tests/unit/search.test.ts`
- Create: `tests/e2e/home.spec.ts`

## Task 1: Scaffold the prototype app and test harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `playwright.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Write the failing smoke test for the route data import**

Create `tests/unit/routes.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { primaryRoutes } from "../../src/data/routes";

describe("primaryRoutes", () => {
  it("contains five top-level onboarding routes", () => {
    expect(primaryRoutes).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails because the app is not scaffolded yet**

Run:

```bash
npm install
npm run test -- tests/unit/routes.test.ts
```

Expected:

```text
FAIL tests/unit/routes.test.ts
Error: Failed to resolve import "../../src/data/routes"
```

- [ ] **Step 3: Create the base toolchain files**

Create `package.json`:

```json
{
  "name": "shouqianba-docs-revamp-prototype",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1"
  },
  "devDependencies": {
    "@playwright/test": "^1.54.1",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^25.0.1",
    "typescript": "^5.6.3",
    "vite": "^5.4.10",
    "vitest": "^2.1.4"
  }
}
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src", "tests"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts"
  }
});
```

- [ ] **Step 4: Add the remaining minimal support files**

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "playwright.config.ts"]
}
```

Create `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>收钱吧开发者文档改版原型</title>
    <meta
      name="description"
      content="面向服务商与 ISV 的收钱吧开发者文档改版原型。"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:4173"
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    port: 4173,
    reuseExistingServer: true,
    timeout: 120000
  }
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 5: Run the toolchain install and verify the project boots into a different failure**

Run:

```bash
npm install
npm run test -- tests/unit/routes.test.ts
```

Expected:

```text
FAIL tests/unit/routes.test.ts
Cannot find module '../../src/data/routes'
```

This confirms the scaffold works and the next missing layer is the actual app code.

## Task 2: Define route content data and search ranking rules

**Files:**
- Create: `src/data/routes.ts`
- Create: `src/utils/search.ts`
- Modify: `tests/unit/routes.test.ts`
- Create: `tests/unit/search.test.ts`

- [ ] **Step 1: Expand the failing route-data test to lock the approved information architecture**

Replace `tests/unit/routes.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { primaryRoutes } from "../../src/data/routes";

describe("primaryRoutes", () => {
  it("contains the approved five top-level onboarding routes", () => {
    expect(primaryRoutes.map((route) => route.slug)).toEqual([
      "offline-store-payments",
      "online-mobile-payments",
      "mini-program-payments",
      "merchant-onboarding-and-settlement",
      "open-capabilities-and-notifications"
    ]);
  });

  it("marks deprecated H5-in-app flow as non-primary", () => {
    const onlineRoute = primaryRoutes.find(
      (route) => route.slug === "online-mobile-payments"
    );

    expect(onlineRoute?.primaryKeywords).not.toContain("微信/支付宝内H5");
    expect(onlineRoute?.secondaryKeywords).toContain("微信/支付宝内H5");
  });
});
```

- [ ] **Step 2: Add a failing test for search ranking**

Create `tests/unit/search.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { searchRouteEntries } from "../../src/utils/search";

describe("searchRouteEntries", () => {
  it("ranks route pages above API-like links for scene keywords", () => {
    const results = searchRouteEntries("公众号支付");

    expect(results[0]?.type).toBe("route");
    expect(results[0]?.title).toContain("线上与移动端支付");
  });

  it("returns onboarding help for settlement keywords", () => {
    const results = searchRouteEntries("收付通开户");

    expect(results[0]?.title).toContain("商户入网与分账");
  });
});
```

- [ ] **Step 3: Run the tests to confirm both fail**

Run:

```bash
npm run test -- tests/unit/routes.test.ts tests/unit/search.test.ts
```

Expected:

```text
FAIL tests/unit/routes.test.ts
FAIL tests/unit/search.test.ts
Error: Cannot find module '../../src/data/routes'
```

- [ ] **Step 4: Implement the approved route data model**

Create `src/data/routes.ts`:

```ts
export type QuickstartStep = {
  title: string;
  detail: string;
};

export type RouteEntry = {
  slug: string;
  title: string;
  shortDescription: string;
  audience: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  directLinks: { label: string; href: string; type: "quickstart" | "api" | "faq" | "acceptance" }[];
  quickstartSteps: QuickstartStep[];
};

export const primaryRoutes: RouteEntry[] = [
  {
    slug: "offline-store-payments",
    title: "线下门店收款",
    shortDescription: "适合 POS、收银台、扫码设备和门店服务商的线下交易场景。",
    audience: "门店 SaaS、POS 服务商、收银集成团队",
    primaryKeywords: ["B扫C", "C扫B-PRO", "C扫B-预下单", "刷脸支付"],
    secondaryKeywords: [],
    directLinks: [
      { label: "线下收款 Quickstart", href: "/routes/offline-store-payments", type: "quickstart" },
      { label: "B扫C 验收文档", href: "#acceptance-bscan-c", type: "acceptance" },
      { label: "线下收款 FAQ", href: "#faq-offline", type: "faq" }
    ],
    quickstartSteps: [
      { title: "判断门店场景", detail: "先判断设备形态与收银链路，再选择 B扫C、C扫B 或刷脸支付。" },
      { title: "准备参数与密钥", detail: "确认商户参数、签名材料与回调地址。" },
      { title: "跑通第一笔交易", detail: "优先完成最小下单和支付成功回调链路。" },
      { title: "进入验收上线", detail: "联调完成后进入验收文档和错误排查。" }
    ]
  },
  {
    slug: "online-mobile-payments",
    title: "线上与移动端支付",
    shortDescription: "适合 App、公众号和 H5 等线上支付接入场景。",
    audience: "线上交易平台、移动应用团队、公众号服务商",
    primaryKeywords: ["App支付", "公众号支付", "手机浏览器H5"],
    secondaryKeywords: ["微信/支付宝内H5"],
    directLinks: [
      { label: "线上支付 Quickstart", href: "/routes/online-mobile-payments", type: "quickstart" },
      { label: "公众号支付说明", href: "#wechat-official", type: "api" },
      { label: "线上支付 FAQ", href: "#faq-online", type: "faq" }
    ],
    quickstartSteps: [
      { title: "判断终端入口", detail: "先区分 App、公众号和浏览器 H5，避免误选支付链路。" },
      { title: "完成接入准备", detail: "准备账号能力、密钥和支付回调处理。" },
      { title: "跑通交易链路", detail: "完成首笔线上交易与回调确认。" },
      { title: "处理历史兼容方案", detail: "对微信/支付宝内 H5 仅展示兼容说明与替代建议。" }
    ]
  },
  {
    slug: "mini-program-payments",
    title: "小程序支付",
    shortDescription: "适合小程序主链路、插件模式、B2B 和微企付等场景。",
    audience: "小程序 SaaS、插件服务商、B2B 场景团队",
    primaryKeywords: ["小程序支付", "小程序插件", "小程序B2B支付", "小程序微企付"],
    secondaryKeywords: [],
    directLinks: [
      { label: "小程序支付 Quickstart", href: "/routes/mini-program-payments", type: "quickstart" },
      { label: "小程序支付 FAQ", href: "#faq-mini-program", type: "faq" },
      { label: "小程序验收文档", href: "#acceptance-mini-program", type: "acceptance" }
    ],
    quickstartSteps: [
      { title: "判断小程序模式", detail: "区分主小程序、插件模式和 B2B/微企付类型。" },
      { title: "准备接入配置", detail: "整理支付主体、密钥、回调和业务参数。" },
      { title: "完成首笔支付", detail: "跑通最小支付链路并验证回调。" },
      { title: "进入验收清单", detail: "切到验收文档和常见问题进行联调收尾。" }
    ]
  },
  {
    slug: "merchant-onboarding-and-settlement",
    title: "商户入网与分账",
    shortDescription: "适合平台型 ISV 的开户、交易和收付通能力接入。",
    audience: "平台型 ISV、连锁 SaaS、分账场景团队",
    primaryKeywords: ["收付通开户", "收付通交易"],
    secondaryKeywords: ["商户入网", "分账"],
    directLinks: [
      { label: "入网与分账 Quickstart", href: "/routes/merchant-onboarding-and-settlement", type: "quickstart" },
      { label: "收付通开户说明", href: "#settlement-onboarding", type: "api" },
      { label: "收付通常见问题", href: "#faq-settlement", type: "faq" }
    ],
    quickstartSteps: [
      { title: "确认平台角色", detail: "先确认是否需要开户、交易管理和平台结算能力。" },
      { title: "整理开户材料", detail: "准备商户入网材料和平台侧配置。" },
      { title: "验证交易能力", detail: "完成交易与结算相关最小链路验证。" },
      { title: "进入上线检查", detail: "结合 FAQ 和验收材料完成上线前核对。" }
    ]
  },
  {
    slug: "open-capabilities-and-notifications",
    title: "开放能力与通知",
    shortDescription: "适合事件通知、回调签名和智慧门店开放能力接入。",
    audience: "平台开放团队、通知处理团队、扩展能力集成方",
    primaryKeywords: ["交易事件通知", "回调签名", "智慧门店开放平台"],
    secondaryKeywords: [],
    directLinks: [
      { label: "开放能力 Quickstart", href: "/routes/open-capabilities-and-notifications", type: "quickstart" },
      { label: "事件通知说明", href: "#events", type: "api" },
      { label: "回调签名说明", href: "#callback-signature", type: "api" }
    ],
    quickstartSteps: [
      { title: "判断扩展能力", detail: "确认需要通知、签名还是智慧门店开放能力。" },
      { title: "准备接收链路", detail: "完成回调地址、签名校验和事件消费准备。" },
      { title: "验证通知处理", detail: "跑通一条通知接收和校验链路。" },
      { title: "进入能力扩展", detail: "继续查看开放平台能力和相关支持文档。" }
    ]
  }
];
```

- [ ] **Step 5: Implement the search utility**

Create `src/utils/search.ts`:

```ts
import { primaryRoutes } from "../data/routes";

export type SearchResult = {
  title: string;
  href: string;
  type: "route" | "direct-link";
  score: number;
};

export function searchRouteEntries(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  const routeResults = primaryRoutes.flatMap((route) => {
    const routeScore =
      route.title.toLowerCase().includes(normalized) ? 12 :
      route.primaryKeywords.some((keyword) => keyword.toLowerCase().includes(normalized)) ? 10 :
      route.secondaryKeywords.some((keyword) => keyword.toLowerCase().includes(normalized)) ? 4 :
      route.shortDescription.toLowerCase().includes(normalized) ? 3 :
      0;

    const directLinkResults = route.directLinks
      .filter((link) => link.label.toLowerCase().includes(normalized))
      .map((link) => ({
        title: link.label,
        href: link.href,
        type: "direct-link" as const,
        score: 2
      }));

    const topRouteResult =
      routeScore > 0
        ? [{ title: route.title, href: `/routes/${route.slug}`, type: "route" as const, score: routeScore }]
        : [];

    return [...topRouteResult, ...directLinkResults];
  });

  return routeResults.sort((left, right) => right.score - left.score);
}
```

- [ ] **Step 6: Run the unit tests and verify they pass**

Run:

```bash
npm run test -- tests/unit/routes.test.ts tests/unit/search.test.ts
```

Expected:

```text
✓ tests/unit/routes.test.ts
✓ tests/unit/search.test.ts
```

## Task 3: Build the app shell, theme tokens, and shared layout

**Files:**
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteFooter.tsx`

- [ ] **Step 1: Write the failing UI test for the shared shell**

Create `tests/unit/app-shell.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../../src/App";

describe("App shell", () => {
  it("renders the shared header navigation", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("收钱吧开发者")).toBeInTheDocument();
    expect(screen.getByText("接入方案")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the UI test to verify it fails**

Run:

```bash
npm run test -- tests/unit/app-shell.test.tsx
```

Expected:

```text
FAIL tests/unit/app-shell.test.tsx
Error: Failed to resolve import "../../src/App"
```

- [ ] **Step 3: Implement the root app and router shell**

Create `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/tokens.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

Create `src/App.tsx`:

```tsx
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RoutePage } from "./pages/RoutePage";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

export default function App() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/routes/:slug" element={<RoutePage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 4: Add the shared visual system and navigation components**

Create `src/styles/tokens.css`:

```css
:root {
  --bg: #fffaf6;
  --surface: #ffffff;
  --surface-soft: #fff7f1;
  --border: #efd7c9;
  --text: #35261d;
  --text-soft: #6f5a4c;
  --brand: #ef6b2e;
  --brand-strong: #d9571e;
  --brand-soft: #fff1e8;
  --radius-lg: 24px;
  --radius-md: 18px;
  --radius-sm: 12px;
  --shadow: 0 18px 42px rgba(116, 62, 29, 0.08);
  --max-width: 1200px;
}
```

Create `src/styles/global.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif;
  color: var(--text);
  background: linear-gradient(180deg, #fffaf6 0%, #fffdfb 100%);
}

a {
  color: inherit;
  text-decoration: none;
}

.app-shell {
  min-height: 100vh;
}

.container {
  width: min(var(--max-width), calc(100vw - 32px));
  margin: 0 auto;
}

.page-content {
  padding-bottom: 48px;
}
```

Create `src/components/SiteHeader.tsx`:

```tsx
import { Link, NavLink } from "react-router-dom";

const items = ["接入方案", "API 参考", "最佳实践", "更新日志", "支持与帮助"];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          收钱吧开发者
        </Link>
        <nav className="site-header__nav" aria-label="主导航">
          {items.map((item) => (
            <NavLink key={item} to="/" className="site-header__link">
              {item}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

Create `src/components/SiteFooter.tsx`:

```tsx
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>收钱吧开发者文档改版原型</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Add the shell styles and rerun the app-shell test**

Append to `src/styles/global.css`:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 250, 246, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
}

.site-header__brand {
  font-weight: 700;
  color: var(--brand-strong);
}

.site-header__nav {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: var(--text-soft);
}

.site-footer {
  border-top: 1px solid var(--border);
  color: var(--text-soft);
  padding: 24px 0 40px;
}
```

Run:

```bash
npm run test -- tests/unit/app-shell.test.tsx
```

Expected:

```text
✓ tests/unit/app-shell.test.tsx
```

## Task 4: Build the homepage hero, five route cards, and direct entry sections

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/RouteCard.tsx`
- Create: `src/components/QuickstartSteps.tsx`
- Create: `src/components/DirectLinks.tsx`
- Create: `src/pages/HomePage.tsx`
- Modify: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Write the failing end-to-end homepage test**

Create `tests/e2e/home.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("homepage shows the approved onboarding structure", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "先找到你的接入路线，再快速跑通第一笔交易" })).toBeVisible();
  await expect(page.getByText("线下门店收款")).toBeVisible();
  await expect(page.getByText("线上与移动端支付")).toBeVisible();
  await expect(page.getByText("小程序支付")).toBeVisible();
  await expect(page.getByText("商户入网与分账")).toBeVisible();
  await expect(page.getByText("开放能力与通知")).toBeVisible();
  await expect(page.getByRole("button", { name: "开始接入" })).toBeVisible();
});
```

- [ ] **Step 2: Run the e2e test and verify it fails**

Run:

```bash
npm run test:e2e -- tests/e2e/home.spec.ts
```

Expected:

```text
FAIL tests/e2e/home.spec.ts
Error: No routes matched location "/"
```

or a missing content assertion if the shell already renders.

- [ ] **Step 3: Implement the homepage components**

Create `src/components/Hero.tsx`:

```tsx
type HeroProps = {
  onStartClick?: () => void;
};

export function Hero({ onStartClick }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="container hero-section__inner">
        <span className="hero-section__eyebrow">服务商 / ISV 首次接入</span>
        <h1>先找到你的接入路线，再快速跑通第一笔交易</h1>
        <p>
          首页先帮你判断该走哪条接入路径，再进入对应 Quickstart、验收文档、FAQ 和 API 参考。
        </p>
        <div className="hero-section__actions">
          <button type="button" className="button button--primary" onClick={onStartClick}>
            开始接入
          </button>
          <a className="button button--secondary" href="#primary-routes">
            查看 5 条主路线
          </a>
          <a className="button button--secondary" href="#direct-links">
            搜索场景 / API / FAQ
          </a>
        </div>
      </div>
    </section>
  );
}
```

Create `src/components/RouteCard.tsx`:

```tsx
import { Link } from "react-router-dom";
import type { RouteEntry } from "../data/routes";

export function RouteCard({ route }: { route: RouteEntry }) {
  return (
    <article className="route-card">
      <h3>{route.title}</h3>
      <p>{route.shortDescription}</p>
      <div className="route-card__chips">
        {route.primaryKeywords.slice(0, 3).map((keyword) => (
          <span key={keyword} className="chip">
            {keyword}
          </span>
        ))}
      </div>
      <Link to={`/routes/${route.slug}`} className="route-card__link">
        查看 Quickstart
      </Link>
    </article>
  );
}
```

Create `src/components/QuickstartSteps.tsx`:

```tsx
const steps = [
  ["场景判断", "先判断你的业务属于哪条接入路线。"],
  ["接入准备", "整理账号、密钥、回调和验收前置材料。"],
  ["最小可跑通链路", "优先完成第一笔成功交易。"],
  ["验收与上线", "进入验收文档、FAQ 和排障支持。"]
];

export function QuickstartSteps() {
  return (
    <section className="section-block">
      <div className="container">
        <h2>首次接入推荐路径</h2>
        <div className="step-grid">
          {steps.map(([title, detail]) => (
            <article key={title} className="step-card">
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `src/components/DirectLinks.tsx`:

```tsx
const links = ["API 参考", "验收文档", "FAQ", "收付通", "事件通知", "回调签名"];

export function DirectLinks() {
  return (
    <section className="section-block" id="direct-links">
      <div className="container">
        <h2>常用直达入口</h2>
        <div className="direct-link-grid">
          {links.map((label) => (
            <a key={label} href="#" className="direct-link-card">
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement the homepage composition**

Create `src/pages/HomePage.tsx`:

```tsx
import { useNavigate } from "react-router-dom";
import { Hero } from "../components/Hero";
import { RouteCard } from "../components/RouteCard";
import { QuickstartSteps } from "../components/QuickstartSteps";
import { DirectLinks } from "../components/DirectLinks";
import { primaryRoutes } from "../data/routes";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Hero onStartClick={() => navigate("/routes/offline-store-payments")} />
      <section className="section-block" id="primary-routes">
        <div className="container">
          <h2>第一步：选择接入路线</h2>
          <div className="route-grid">
            {primaryRoutes.map((route) => (
              <RouteCard key={route.slug} route={route} />
            ))}
          </div>
        </div>
      </section>
      <QuickstartSteps />
      <DirectLinks />
    </>
  );
}
```

- [ ] **Step 5: Add homepage styles**

Append to `src/styles/global.css`:

```css
.hero-section {
  padding: 72px 0 48px;
}

.hero-section__inner {
  background: linear-gradient(135deg, #fff4ea 0%, #fffaf6 56%, #fff1e6 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow);
}

.hero-section__eyebrow {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--brand-soft);
  color: var(--brand-strong);
  font-size: 12px;
  font-weight: 700;
}

.hero-section h1 {
  margin: 16px 0 12px;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.1;
}

.hero-section__actions,
.route-card__chips,
.direct-link-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button {
  border: 0;
  border-radius: 999px;
  padding: 12px 18px;
  font: inherit;
  cursor: pointer;
}

.button--primary {
  background: var(--brand);
  color: white;
}

.button--secondary {
  background: white;
  color: var(--brand-strong);
  border: 1px solid var(--border);
}

.section-block {
  padding: 28px 0;
}

.route-grid,
.step-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.route-card,
.step-card,
.direct-link-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
}

.route-card,
.step-card {
  padding: 20px;
}

.route-card__link {
  display: inline-flex;
  margin-top: 14px;
  color: var(--brand-strong);
  font-weight: 700;
}

.chip {
  background: var(--brand-soft);
  color: var(--brand-strong);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
}

.direct-link-card {
  padding: 14px 16px;
}

@media (max-width: 768px) {
  .hero-section__inner {
    padding: 28px 20px;
  }

  .route-grid,
  .step-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 6: Run unit and e2e verification**

Run:

```bash
npm run test
npm run test:e2e -- tests/e2e/home.spec.ts
```

Expected:

```text
All unit tests pass
1 passed (Playwright)
```

## Task 5: Build the route detail page template and search-driven onboarding flow

**Files:**
- Create: `src/pages/RoutePage.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/DirectLinks.tsx`
- Modify: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Add a failing e2e test for route detail navigation**

Append to `tests/e2e/home.spec.ts`:

```ts
test("route cards navigate to quickstart detail pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "查看 Quickstart" }).first().click();

  await expect(page.getByRole("heading", { name: "线下门店收款" })).toBeVisible();
  await expect(page.getByText("判断门店场景")).toBeVisible();
  await expect(page.getByText("B扫C")).toBeVisible();
});
```

- [ ] **Step 2: Run the e2e test and verify it fails on missing route page content**

Run:

```bash
npm run test:e2e -- tests/e2e/home.spec.ts
```

Expected:

```text
FAIL route cards navigate to quickstart detail pages
Expected heading "线下门店收款" to be visible
```

- [ ] **Step 3: Implement the route detail page**

Create `src/pages/RoutePage.tsx`:

```tsx
import { Navigate, useParams } from "react-router-dom";
import { primaryRoutes } from "../data/routes";

export function RoutePage() {
  const { slug } = useParams();
  const route = primaryRoutes.find((entry) => entry.slug === slug);

  if (!route) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="section-block">
      <div className="container route-page">
        <div className="route-page__hero">
          <p className="route-page__eyebrow">{route.audience}</p>
          <h1>{route.title}</h1>
          <p>{route.shortDescription}</p>
        </div>

        <div className="route-page__layout">
          <article className="route-page__panel">
            <h2>Quickstart</h2>
            <ol>
              {route.quickstartSteps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>
          </article>

          <aside className="route-page__panel">
            <h2>相关入口</h2>
            <ul>
              {route.directLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <h3>代表场景</h3>
            <div className="route-card__chips">
              {route.primaryKeywords.map((keyword) => (
                <span key={keyword} className="chip">
                  {keyword}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add lightweight search interaction to the hero**

Replace `src/components/Hero.tsx` with:

```tsx
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchRouteEntries } from "../utils/search";

type HeroProps = {
  onStartClick?: () => void;
};

export function Hero({ onStartClick }: HeroProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const [firstResult] = searchRouteEntries(query);

    if (firstResult) {
      navigate(firstResult.href);
    }
  }

  return (
    <section className="hero-section">
      <div className="container hero-section__inner">
        <span className="hero-section__eyebrow">服务商 / ISV 首次接入</span>
        <h1>先找到你的接入路线，再快速跑通第一笔交易</h1>
        <p>
          首页先帮你判断该走哪条接入路径，再进入对应 Quickstart、验收文档、FAQ 和 API 参考。
        </p>
        <form className="hero-search" onSubmit={handleSubmit}>
          <input
            aria-label="搜索场景、API 或 FAQ"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="试试搜索：公众号支付、B扫C、收付通开户"
          />
          <button type="submit" className="button button--primary">
            搜索
          </button>
        </form>
        <div className="hero-section__actions">
          <button type="button" className="button button--primary" onClick={onStartClick}>
            开始接入
          </button>
          <a className="button button--secondary" href="#primary-routes">
            查看 5 条主路线
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Style the route page and search input**

Append to `src/styles/global.css`:

```css
.hero-search {
  display: flex;
  gap: 12px;
  margin: 20px 0 16px;
}

.hero-search input {
  flex: 1;
  min-width: 0;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: white;
  font: inherit;
}

.route-page__hero,
.route-page__panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
}

.route-page__hero {
  padding: 24px;
  margin-bottom: 20px;
}

.route-page__layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 18px;
}

.route-page__panel {
  padding: 20px;
}

.route-page__eyebrow {
  color: var(--brand-strong);
  font-weight: 700;
}

@media (max-width: 768px) {
  .hero-search,
  .route-page__layout {
    grid-template-columns: 1fr;
  }

  .hero-search {
    flex-direction: column;
  }
}
```

- [ ] **Step 6: Verify route navigation and search-driven onboarding**

Run:

```bash
npm run test
npm run test:e2e -- tests/e2e/home.spec.ts
```

Expected:

```text
All unit tests pass
2 passed (Playwright)
```

## Task 6: Final polish, responsive checks, and build verification

**Files:**
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Add a failing responsive e2e test**

Append to `tests/e2e/home.spec.ts`:

```ts
test("homepage remains usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "先找到你的接入路线，再快速跑通第一笔交易" })).toBeVisible();
  await expect(page.getByText("第一步：选择接入路线")).toBeVisible();
  await expect(page.getByRole("button", { name: "开始接入" })).toBeVisible();
});
```

- [ ] **Step 2: Run the e2e suite and identify any mobile layout failure**

Run:

```bash
npm run test:e2e -- tests/e2e/home.spec.ts
```

Expected:

```text
If layout is incomplete, at least one mobile assertion fails
```

- [ ] **Step 3: Tighten the responsive and polish rules**

Append to `src/styles/global.css`:

```css
@media (max-width: 640px) {
  .container {
    width: min(var(--max-width), calc(100vw - 24px));
  }

  .site-header__inner {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 12px;
    padding: 12px 0;
  }

  .site-header__nav {
    flex-wrap: wrap;
    gap: 10px 14px;
  }

  .section-block {
    padding: 22px 0;
  }

  .route-card,
  .step-card,
  .route-page__hero,
  .route-page__panel {
    padding: 16px;
  }
}
```

- [ ] **Step 4: Run the full verification suite**

Run:

```bash
npm run test
npm run test:e2e
npm run build
```

Expected:

```text
All unit tests pass
All Playwright tests pass
vite build completes successfully
```

- [ ] **Step 5: Manual QA checkpoint**

Run:

```bash
npm run dev -- --host 127.0.0.1 --port 4173
```

Check manually:

```text
1. Homepage shows the five approved primary routes.
2. Brand styling uses warm Shouqianba-like colors without changing the approved information architecture.
3. The primary CTA remains "开始接入".
4. Route detail pages show Quickstart steps before deep links.
5. Mobile layout remains readable without horizontal overflow.
```

## Self-Review

### Spec coverage

- Homepage as an onboarding decision page: covered by Tasks 3 and 4.
- Five approved primary routes: covered by Task 2 and Task 4.
- Quickstart before API details: covered by Task 5.
- Search prioritizing scene keywords: covered by Task 2 and Task 5.
- Warm brand styling without changing structure: covered by Tasks 3, 4, and 6.
- Responsive desktop/mobile behavior: covered by Task 6.

### Placeholder scan

- No placeholder markers remain.
- Each code-writing step includes concrete file paths and code blocks.

### Type consistency

- `RouteEntry` and `searchRouteEntries()` names are introduced in Task 2 and reused consistently later.
- Route slug names are defined once in `src/data/routes.ts` and reused consistently in tests and navigation.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-06-shouqianba-docs-revamp-implementation.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
