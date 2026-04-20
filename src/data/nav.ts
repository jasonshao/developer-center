import type { IconName } from "../components/icons";
import { scenariosByModule } from "./scenarios";

export type TabName = "文档首页" | "接入指南" | "API 参考" | "最佳实践" | "支持";

export const TABS: TabName[] = ["文档首页", "接入指南", "API 参考", "最佳实践", "支持"];

export type ModuleDef = { id: string; label: string; icon: IconName };

export const MODULES: ModuleDef[] = [
  { id: "mod-checkout", label: "收款接入", icon: "Wallet" },
  { id: "mod-online", label: "线上支付", icon: "Link" },
  { id: "mod-mp", label: "小程序支付", icon: "Phone" },
  { id: "mod-split", label: "收付通", icon: "Grid" },
  { id: "mod-notify", label: "通知与签名", icon: "Bell" },
  { id: "mod-ops", label: "验收与排障", icon: "Shield" },
];

export type NavLinkItem = { id: string; kind: "link"; label: string; moduleId?: string };
export type NavApiItem = { id: string; kind: "api"; method: "GET" | "POST"; label: string };
export type NavModuleChild = { id: string; label: string; icon: IconName; route?: boolean };
export type NavModuleItem = {
  id: string;
  kind: "module";
  label: string;
  icon: IconName;
  children: NavModuleChild[];
};
export type NavItem = NavLinkItem | NavApiItem | NavModuleItem;
export type NavSection = { group: string; items: NavItem[] };

const NAV_HOME: NavSection[] = [
  {
    group: "入门",
    items: [
      { id: "home", kind: "link", label: "文档首页" },
      { id: "overview", kind: "link", label: "平台概览" },
      { id: "accounts", kind: "link", label: "账号与环境" },
      { id: "guide-select", kind: "link", label: "场景选择器" },
    ],
  },
  {
    group: "产品模块",
    items: MODULES.map((m) => ({
      id: `home-${m.id}`,
      kind: "link" as const,
      label: m.label,
      moduleId: m.id,
    })),
  },
  {
    group: "资源",
    items: [
      { id: "changelog", kind: "link", label: "更新日志" },
      { id: "sdks", kind: "link", label: "SDK 与示例" },
      { id: "support", kind: "link", label: "获取支持" },
    ],
  },
];

const NAV_GUIDES: NavSection[] = [
  {
    group: "开始之前",
    items: [
      { id: "guide-select", kind: "link", label: "场景选择器" },
      { id: "guide-prereq", kind: "link", label: "前置准备" },
      { id: "guide-keys", kind: "link", label: "获取测试凭证" },
    ],
  },
  {
    group: "按模块接入",
    items: MODULES.map<NavModuleItem>((m) => ({
      id: m.id,
      kind: "module",
      label: m.label,
      icon: m.icon,
      children: scenariosByModule(m.id).map((s) => ({
        id: s.id,
        label: s.title,
        icon: s.icon,
        route: true,
      })),
    })),
  },
];

const NAV_API: NavSection[] = [
  {
    group: "约定",
    items: [
      { id: "api-intro", kind: "link", label: "请求规范" },
      { id: "api-sign", kind: "link", label: "签名 (MD5)" },
      { id: "api-verify", kind: "link", label: "回调验签 (RSA)" },
      { id: "api-codes", kind: "link", label: "业务结果码" },
    ],
  },
  {
    group: "终端与激活",
    items: [
      { id: "api-activate", kind: "api", method: "POST", label: "terminal/activate" },
      { id: "api-checkin", kind: "api", method: "POST", label: "terminal/checkin" },
    ],
  },
  {
    group: "核心交易",
    items: [
      { id: "api-pay", kind: "api", method: "POST", label: "upay/v2/pay" },
      { id: "api-precreate", kind: "api", method: "POST", label: "upay/v2/precreate" },
      { id: "api-query", kind: "api", method: "POST", label: "upay/v2/query" },
      { id: "api-refund", kind: "api", method: "POST", label: "upay/v2/refund" },
      { id: "api-cancel", kind: "api", method: "POST", label: "upay/v2/cancel" },
    ],
  },
  {
    group: "线上支付",
    items: [{ id: "api-wap", kind: "api", method: "POST", label: "upay/v2/wap" }],
  },
  {
    group: "小程序与推送",
    items: [
      { id: "api-mpplugin", kind: "api", method: "POST", label: "upay/v2/mpplugin" },
      { id: "api-mis", kind: "api", method: "POST", label: "upay/v2/mis" },
    ],
  },
  {
    group: "刷脸支付",
    items: [
      { id: "api-face-auth", kind: "api", method: "POST", label: "support/getWxpayfaceAuthinfo" },
      { id: "api-face-pay", kind: "api", method: "POST", label: "upay/v2/pay (face)" },
    ],
  },
  {
    group: "收付通",
    items: [
      { id: "api-split", kind: "api", method: "POST", label: "openapi/split/*" },
      { id: "api-merchant", kind: "api", method: "POST", label: "openapi/merchant/*" },
    ],
  },
  {
    group: "智慧门店（Beta）",
    items: [
      { id: "api-smart", kind: "api", method: "POST", label: "openapi/smartstore/*" },
    ],
  },
  {
    group: "通知",
    items: [{ id: "api-webhook", kind: "api", method: "POST", label: "webhook (callback)" }],
  },
];

const NAV_BEST: NavSection[] = [
  {
    group: "订单模型",
    items: [
      { id: "best-idempotent", kind: "link", label: "client_sn 与幂等" },
      { id: "best-status", kind: "link", label: "订单状态机" },
      { id: "best-cancel-vs-refund", kind: "link", label: "撤单 vs 退款" },
      { id: "best-expiry", kind: "link", label: "付款码 1min / 预下单 4min" },
    ],
  },
  {
    group: "可靠性",
    items: [
      { id: "best-polling", kind: "link", label: "pay / precreate 轮询节奏" },
      { id: "best-callback-backup", kind: "link", label: "回调 + 主动查询兜底" },
      { id: "best-key-rotate", kind: "link", label: "密钥每日刷新 (checkin)" },
      { id: "best-return-vs-notify", kind: "link", label: "return_url vs notify_url" },
    ],
  },
  {
    group: "安全",
    items: [
      { id: "best-sign-md5", kind: "link", label: "请求 MD5 签名" },
      { id: "best-verify-rsa", kind: "link", label: "回调 RSA 验签" },
      { id: "best-mp-entity", kind: "link", label: "小程序主体一致性" },
    ],
  },
];

const NAV_SUPPORT: NavSection[] = [
  {
    group: "排障",
    items: [
      { id: "sup-callback-miss", kind: "link", label: "回调收不到 / 验签失败" },
      { id: "sup-sign-fail", kind: "link", label: "签名错误 ej26" },
      { id: "sup-polling", kind: "link", label: "订单长时间非最终态" },
      { id: "sup-wx-refund", kind: "link", label: "微信退款失败" },
      { id: "sup-activate-expire", kind: "link", label: "激活码失效" },
      { id: "sup-refund-balance", kind: "link", label: "退款余额不足" },
    ],
  },
  {
    group: "结果码",
    items: [
      { id: "sup-codes-biz", kind: "link", label: "业务结果码" },
      { id: "sup-codes-comm", kind: "link", label: "通讯状态码" },
    ],
  },
  {
    group: "集成 Q&A",
    items: [
      { id: "sup-qa-mp-entity", kind: "link", label: "小程序主体与入网" },
      { id: "sup-qa-app-deprecated", kind: "link", label: "App 支付为何不推荐" },
      { id: "sup-qa-return-vs-notify", kind: "link", label: "return_url vs notify_url" },
      { id: "sup-qa-terminal", kind: "link", label: "终端与激活" },
    ],
  },
  {
    group: "联系",
    items: [
      { id: "sup-ticket", kind: "link", label: "提交工单" },
      { id: "sup-domains", kind: "link", label: "接入域名" },
    ],
  },
];

export const NAV_BY_TAB: Record<TabName, NavSection[]> = {
  文档首页: NAV_HOME,
  接入指南: NAV_GUIDES,
  "API 参考": NAV_API,
  最佳实践: NAV_BEST,
  支持: NAV_SUPPORT,
};

export const DEFAULT_ITEM_BY_TAB: Record<TabName, string> = {
  文档首页: "home",
  接入指南: "sc-b2c",
  "API 参考": "api-intro",
  最佳实践: "best-idempotent",
  支持: "sup-callback-miss",
};

export const DEFAULT_MODULE_BY_TAB: Partial<Record<TabName, string>> = {
  接入指南: "mod-checkout",
};

export type TabSlug = "home" | "guides" | "api" | "best" | "support";

export const TAB_TO_SLUG: Record<TabName, TabSlug> = {
  文档首页: "home",
  接入指南: "guides",
  "API 参考": "api",
  最佳实践: "best",
  支持: "support",
};

export const SLUG_TO_TAB: Record<TabSlug, TabName> = {
  home: "文档首页",
  guides: "接入指南",
  api: "API 参考",
  best: "最佳实践",
  support: "支持",
};
