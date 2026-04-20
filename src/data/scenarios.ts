import type { IconName } from "../components/icons";

export type ScenarioStatus = "recommended" | "deprecated" | "beta";
export type Endpoint = { method: "GET" | "POST"; path: string; purpose: string };

export type Scenario = {
  id: string;
  moduleId: string;
  title: string;
  aka?: string[];
  status: ScenarioStatus;
  icon: IconName;
  summary: string;
  whenToUse: string[];
  endpoints: Endpoint[];
  notes: string[];
  acceptanceDoc?: string;
  hasFullQuickstart: boolean;
  nextSteps?: { label: string; href?: string }[];
};

export const SCENARIOS: Scenario[] = [
  // ── 收款接入 ─────────────────────────────────────────────
  {
    id: "sc-b2c",
    moduleId: "mod-checkout",
    title: "B扫C · 付款码支付",
    aka: ["付款码", "当面付-被扫"],
    status: "recommended",
    icon: "Bolt",
    summary:
      "店员扫描顾客出示的付款码完成支付——最常用的线下收款场景，适合 POS、收银台、扫码设备。",
    whenToUse: [
      "线下门店 POS / 收银台 / 扫码枪",
      "顾客使用支付宝、微信、云闪付付款码",
      "需要终端激活与每日 checkin 的长驻设备",
    ],
    endpoints: [
      { method: "POST", path: "/terminal/activate", purpose: "激活终端" },
      { method: "POST", path: "/terminal/checkin", purpose: "每日刷新 terminal_key" },
      { method: "POST", path: "/upay/v2/pay", purpose: "条码支付" },
      { method: "POST", path: "/upay/v2/query", purpose: "轮询与兜底查询" },
      { method: "POST", path: "/upay/v2/refund", purpose: "退款" },
      { method: "POST", path: "/upay/v2/cancel", purpose: "撤单（当天全额）" },
    ],
    notes: [
      "付款码 dynamic_id 的有效期仅 1 分钟，从用户展示时起算。",
      "同步返回若非最终态，必须立即按 3-5s 节奏轮询，总时长 40-50s。",
      "终端密钥每自然日过期，首次支付前先调 checkin。",
    ],
    acceptanceDoc: "收钱吧-B扫C 交易场景集成验收表V7.1.4.xlsx",
    hasFullQuickstart: true,
  },
  {
    id: "sc-c2b-precreate",
    moduleId: "mod-checkout",
    title: "C扫B · 预下单",
    aka: ["二维码收款", "precreate"],
    status: "recommended",
    icon: "Grid",
    summary:
      "动态生成二维码让顾客扫描完成支付，适合收银台展示、小票二维码或小程序/H5 跳转的前置步骤。",
    whenToUse: [
      "顾客扫商户码支付（收银台屏幕、小票）",
      "需要按订单动态生成二维码，而不是静态牌子",
      "也是 H5 / 小程序 / App 支付的公共前置接口",
    ],
    endpoints: [
      { method: "POST", path: "/upay/v2/precreate", purpose: "生成 qr_code" },
      { method: "POST", path: "/upay/v2/query", purpose: "按 sn / client_sn 轮询" },
      { method: "POST", path: "/upay/v2/refund", purpose: "退款" },
    ],
    notes: [
      "qr_code 有效期 4 分钟，过期必须重新 precreate，不可修改现有码。",
      "轮询节奏：前期 2s，后期 5s，总时长 100-120s。",
      "payway=2 支付宝 / 3 微信；sub_payway 用于区分 H5、小程序、B2B、微企付等。",
    ],
    acceptanceDoc: "收钱吧C扫B-预下单验收文档V1.0.3.xlsx",
    hasFullQuickstart: true,
  },
  {
    id: "sc-c2b-pro",
    moduleId: "mod-checkout",
    title: "C扫B-PRO · 跳转收银",
    aka: ["wap2"],
    status: "recommended",
    icon: "Link",
    summary:
      "扫码后跳转到收钱吧托管收银台完成支付，商户不处理支付跳转细节——接入最轻。",
    whenToUse: [
      "希望最快上线、无需维护收银台的门店",
      "顾客用支付宝/微信扫商户码直接进收银台",
      "不希望自管 payway / sub_payway 的情况",
    ],
    endpoints: [
      { method: "POST", path: "/upay/v2/wap", purpose: "获取跳转 URL" },
      { method: "POST", path: "/upay/v2/query", purpose: "轮询 / 兜底" },
    ],
    notes: [
      "跳转链路由收钱吧托管，UI 与品牌展示受限。",
      "return_url 仅是用户侧回跳，不保证可靠——必须以 notify_url 异步回调为准。",
    ],
    acceptanceDoc: "收钱吧C扫B-PRO支付验收文档V1.0.3.xlsx",
    hasFullQuickstart: false,
  },
  {
    id: "sc-face",
    moduleId: "mod-checkout",
    title: "刷脸支付",
    aka: ["微信刷脸", "支付宝刷脸"],
    status: "recommended",
    icon: "Dot",
    summary:
      "依赖刷脸设备 SDK 完成生物识别并调起支付——微信/支付宝刷脸设备的双渠道接入。",
    whenToUse: [
      "已采购或计划采购刷脸设备的商户",
      "要求零手动操作的高客流门店",
    ],
    endpoints: [
      { method: "POST", path: "/upay/support/getWxpayfaceAuthinfo", purpose: "获取微信刷脸授权 info" },
      { method: "POST", path: "/upay/v2/pay", purpose: "刷脸支付（payway 匹配刷脸 sub_payway）" },
    ],
    notes: [
      "前端需集成刷脸设备 SDK，后端仅对接支付接口。",
      "微信与支付宝的刷脸凭证获取流程不同，需分别适配。",
    ],
    hasFullQuickstart: false,
  },

  // ── 线上支付 ─────────────────────────────────────────────
  {
    id: "sc-official-account",
    moduleId: "mod-online",
    title: "公众号支付",
    status: "recommended",
    icon: "Link",
    summary: "在微信公众号 / 内置浏览器内调起微信支付——H5 类线上收款的最主流形态。",
    whenToUse: [
      "用户从公众号菜单 / 文章跳转到商户 H5",
      "需要在微信浏览器内唤起支付",
    ],
    endpoints: [
      { method: "POST", path: "/upay/v2/precreate", purpose: "payway=3, sub_payway=3 生成 wap_pay_request" },
      { method: "POST", path: "/upay/v2/query", purpose: "轮询兜底" },
    ],
    notes: [
      "precreate 返回 wap_pay_request，按微信 JSAPI 规则调起支付。",
      "必须在公众号平台配置支付授权目录。",
    ],
    acceptanceDoc: "收钱吧公众号支付验收文档V1.0.3.xlsx",
    hasFullQuickstart: false,
  },
  {
    id: "sc-mobile-h5",
    moduleId: "mod-online",
    title: "手机浏览器 H5",
    status: "recommended",
    icon: "Phone",
    summary:
      "在微信/支付宝之外的移动浏览器中跳起支付——触达公众号体系外的移动用户。",
    whenToUse: [
      "短信 / 广告 / 搜索落地页的移动端支付",
      "用户使用 Safari、Chrome 等第三方浏览器",
    ],
    endpoints: [
      { method: "POST", path: "/upay/v2/precreate", purpose: "sub_payway=6 外部浏览器 H5" },
    ],
    notes: [
      "会跳到支付宝 / 微信 App 完成支付，再回到商户 return_url。",
      "return_url 不可靠，必须配合 notify_url 异步回调。",
    ],
    acceptanceDoc: "收钱吧手机浏览器支付验收文档V1.0.3.xlsx",
    hasFullQuickstart: false,
  },
  {
    id: "sc-inapp-h5",
    moduleId: "mod-online",
    title: "微信/支付宝内 H5",
    status: "deprecated",
    icon: "Warn",
    summary:
      "在微信 / 支付宝 App 内打开的 H5 页面触发同端支付——官方已不推荐，请改用公众号支付或小程序支付。",
    whenToUse: [
      "仅历史遗留商户维护使用",
      "新接入一律不建议选择",
    ],
    endpoints: [
      { method: "POST", path: "/upay/v2/precreate", purpose: "历史 sub_payway，新接入请勿使用" },
    ],
    notes: [
      "微信侧建议公众号支付；支付宝侧建议小程序支付。",
      "该场景已标记「不推荐」，无法保证长期可用。",
    ],
    acceptanceDoc: "收钱吧微信:支付宝内置H5支付验收文档V1.0.3.xlsx",
    hasFullQuickstart: false,
  },
  {
    id: "sc-app",
    moduleId: "mod-online",
    title: "App 支付",
    status: "deprecated",
    icon: "Warn",
    summary:
      "原生 App 内调起支付。官方**不推荐**通过 Web API 直接接入，建议改走 C扫B（App 内生成二维码）。",
    whenToUse: [
      "仅直连对接或特殊场景，请先联系技术对接人评估",
      "大部分 App 场景应改为：App 内生成 qr_code → 用户跳转或展示",
    ],
    endpoints: [
      { method: "POST", path: "/upay/v2/precreate", purpose: "sub_payway=5，仅直连开放" },
    ],
    notes: [
      "替代方案：用 C扫B-预下单生成二维码后由 App 跳起 / 展示。",
      "如坚持走 App 支付需向收钱吧技术对接人申请直连权限。",
    ],
    acceptanceDoc: "收钱吧APP支付验收文档V1.0.3.xlsx",
    hasFullQuickstart: false,
  },

  // ── 小程序支付 ───────────────────────────────────────────
  {
    id: "sc-mp",
    moduleId: "mod-mp",
    title: "小程序支付",
    status: "recommended",
    icon: "Phone",
    summary:
      "在微信 / 支付宝小程序内调起支付。**小程序主体必须与收钱吧入网商户同一主体**——这是最常见的阻断点。",
    whenToUse: [
      "已有或将上线品牌小程序的商户",
      "已确认小程序主体与入网商户一致",
    ],
    endpoints: [
      { method: "POST", path: "/upay/v2/precreate", purpose: "payway=3, sub_payway=4, extended.sub_appid" },
    ],
    notes: [
      "主体必须一致——不一致时微信/支付宝会直接拒付，无法通过参数绕过。",
      "extended.sub_appid 传当前小程序 AppID。",
      "测试商户无法用于小程序联调，需要真实主体的商户号。",
    ],
    acceptanceDoc: "收钱吧小程序支付验收文档V1.0.3.xlsx",
    hasFullQuickstart: false,
  },
  {
    id: "sc-mp-plugin",
    moduleId: "mod-mp",
    title: "小程序插件",
    status: "recommended",
    icon: "Code",
    summary:
      "使用收钱吧官方小程序插件快速接入支付——无需自己处理调起与回调逻辑，推荐用于自有小程序 + 支付快速上线。",
    whenToUse: [
      "不想自己维护调起代码的团队",
      "需要官方插件维护渠道兼容性的情况",
    ],
    endpoints: [
      { method: "POST", path: "/upay/v2/precreate", purpose: "配合微信插件调起" },
    ],
    notes: [
      "前端需集成微信官方的收钱吧插件版本。",
      "插件内部复用 precreate 返回的 wap_pay_request 字段。",
    ],
    acceptanceDoc: "收钱吧小程序插件支付验收文档V1.0.3.xlsx",
    hasFullQuickstart: false,
  },
  {
    id: "sc-mp-b2b",
    moduleId: "mod-mp",
    title: "小程序 B2B 支付",
    status: "recommended",
    icon: "Grid",
    summary:
      "企业间在小程序内对公支付——面向批发、采购等对公结算场景。",
    whenToUse: ["企业/对公客户在小程序内付款", "需要对公凭证"],
    endpoints: [
      { method: "POST", path: "/upay/v2/precreate", purpose: "B2B sub_payway" },
    ],
    notes: [
      "需要入网时开通对公支付能力。",
      "付款方为企业账户，非个人。",
    ],
    hasFullQuickstart: false,
  },
  {
    id: "sc-mp-micro",
    moduleId: "mod-mp",
    title: "小程序微企付",
    status: "recommended",
    icon: "Phone",
    summary: "小程序场景下的微企付能力，面向小微企业主在小程序内付款的场景。",
    whenToUse: ["小微企业付款人", "小程序内触达"],
    endpoints: [
      { method: "POST", path: "/upay/v2/precreate", purpose: "sub_payway=27" },
    ],
    notes: ["与 B2B 使用不同的 sub_payway 取值。"],
    hasFullQuickstart: false,
  },

  // ── 收付通 ───────────────────────────────────────────────
  {
    id: "sc-split-onboard",
    moduleId: "mod-split",
    title: "收付通 · 开户",
    status: "recommended",
    icon: "Shield",
    summary: "平台型 ISV 为下级商户在收钱吧侧完成开户，是分账 / 结算链路的前置。",
    whenToUse: [
      "平台模式的 SaaS / ISV",
      "需要为 B 端商户统一管理开户、资质、银行卡",
    ],
    endpoints: [
      { method: "POST", path: "/openapi/merchant/apply", purpose: "提交开户申请" },
      { method: "POST", path: "/openapi/merchant/query", purpose: "开户状态查询" },
    ],
    notes: [
      "所需材料、审核节奏见「收付通开户类 openApi 接口」文档。",
      "必须先开户完成再走交易链路。",
    ],
    hasFullQuickstart: false,
  },
  {
    id: "sc-split-trade",
    moduleId: "mod-split",
    title: "收付通 · 交易与分账",
    status: "recommended",
    icon: "Wallet",
    summary: "基于收付通账户完成交易与分账——覆盖二级商户、分账方、结算规则。",
    whenToUse: ["平台需要把一笔订单按规则拆给多方", "需要托管二级商户资金"],
    endpoints: [
      { method: "POST", path: "/openapi/trade/create", purpose: "发起交易" },
      { method: "POST", path: "/openapi/split/apply", purpose: "提交分账" },
      { method: "POST", path: "/openapi/split/query", purpose: "查询分账结果" },
    ],
    notes: [
      "分账金额不能超过未清算余额；退款会反向释放对应分账。",
      "分账延迟依赖清算周期，不是实时到账。",
    ],
    hasFullQuickstart: false,
  },

  // ── 通知与签名 ───────────────────────────────────────────
  {
    id: "sc-event-notify",
    moduleId: "mod-notify",
    title: "交易事件通知（实时回调）",
    status: "recommended",
    icon: "Bell",
    summary:
      "收钱吧向商户 notify_url 推送交易、退款、部分退款、预授权完成等事件。使用 **RSA SHA256WithRSA** 验签。",
    whenToUse: [
      "任何接入支付的商户（强烈推荐同步接入）",
      "需要实时感知支付结果以解锁业务流程",
    ],
    endpoints: [
      { method: "POST", path: "{notify_url}", purpose: "由商户提供的公网地址接收 JSON 推送" },
    ],
    notes: [
      "从 Header Authorization 取 sign，先 base64 decode；用收钱吧下发的 X509 公钥按 SHA256WithRSA 验签。",
      "回调不保证为最终态——验签通过后仍需对照 5 个终态 PAID / PAY_CANCELED / REFUNDED / PARTIAL_REFUNDED / CANCELED。",
      "商户必须在 3 秒内返回 success 字样，否则会按指数退避重试。",
    ],
    hasFullQuickstart: false,
  },

  // ── 验收与排障 ───────────────────────────────────────────
  {
    id: "sc-smart-store",
    moduleId: "mod-ops",
    title: "智慧门店开放平台（Beta）",
    status: "beta",
    icon: "Shield",
    summary:
      "门店级开放能力与会员/订单交互，使用**独立的签名算法**（timestamp + msgId + businessData + nonce + appKey 排序后 SHA256）。",
    whenToUse: ["连锁门店需要会员、订单、小票等开放能力", "当前处于 Beta 阶段，接入前请联系技术对接人"],
    endpoints: [
      { method: "POST", path: "/openapi/smartstore/*", purpose: "门店开放平台接口族" },
    ],
    notes: [
      "签名与 Web API 不同：将 timestamp、msgId、businessData、nonce、appKey 按字典序拼接后 SHA256。",
      "Beta 能力，字段与路径可能调整，建议对接前对齐最新文档。",
    ],
    hasFullQuickstart: false,
  },
];

export const SCENARIO_BY_ID: Record<string, Scenario> = Object.fromEntries(
  SCENARIOS.map((s) => [s.id, s])
);

export function scenariosByModule(moduleId: string): Scenario[] {
  return SCENARIOS.filter((s) => s.moduleId === moduleId);
}
