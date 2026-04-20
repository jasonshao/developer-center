import { Icons, type IconName } from "../components/icons";
import { scenariosByModule } from "../data/scenarios";

type Props = {
  onOpenRoute: () => void;
  onSelectModule: (moduleId: string) => void;
  onOpenDecisionTree: () => void;
};

const MODULES: { id: string; icon: IconName; title: string; desc: string; links: string[] }[] = [
  {
    id: "mod-checkout",
    icon: "Wallet",
    title: "收款接入",
    desc: "B扫C、C扫B-预下单、C扫B-PRO、刷脸——线下收款的完整场景矩阵。",
    links: ["B扫C", "C扫B-预下单", "刷脸支付"],
  },
  {
    id: "mod-online",
    icon: "Link",
    title: "线上支付",
    desc: "公众号、浏览器 H5、微信/支付宝内 H5、App——覆盖 Web/移动端的 4 条路径。",
    links: ["公众号支付", "浏览器 H5", "App（不推荐）"],
  },
  {
    id: "mod-mp",
    icon: "Phone",
    title: "小程序支付",
    desc: "小程序、插件、B2B、微企付——**主体必须与入网商户一致**。",
    links: ["小程序支付", "小程序插件", "B2B / 微企付"],
  },
  {
    id: "mod-split",
    icon: "Grid",
    title: "收付通",
    desc: "开户 + 交易分账——平台 ISV 的二级商户、分账、结算能力。",
    links: ["收付通开户", "交易与分账"],
  },
  {
    id: "mod-notify",
    icon: "Bell",
    title: "通知与签名",
    desc: "RSA SHA256WithRSA 回调验签；MD5 请求签名；终态与兜底策略。",
    links: ["交易事件通知", "回调验签", "签名规则"],
  },
  {
    id: "mod-ops",
    icon: "Shield",
    title: "验收与排障",
    desc: "场景验收表、业务结果码、智慧门店开放平台（Beta）。",
    links: ["验收表", "业务结果码", "智慧门店"],
  },
];

export function HomePage({ onOpenRoute, onSelectModule, onOpenDecisionTree }: Props) {
  const TASKS = [
    {
      label: "不确定用哪个场景",
      title: "打开场景选择器",
      desc: "按支付发起方 → 渠道的决策树，一屏看完 16 个场景。",
      onClick: onOpenDecisionTree,
    },
    {
      label: "5 分钟",
      title: "跑通第一笔 B扫C",
      desc: "激活 → checkin → pay → query 的最短链路。",
      onClick: onOpenRoute,
    },
    {
      label: "上线前",
      title: "回调验签与轮询兜底",
      desc: "Authorization 头、RSA SHA256WithRSA、对照 5 个终态。",
      onClick: () => onSelectModule("mod-notify"),
    },
  ];

  const QUICKSTARTS = [
    { n: "01", title: "B扫C · Quickstart", sub: "激活 → 签到 → 条码支付 → 查询，四步跑通。", time: "5 分钟", scenario: "sc-b2c" },
    { n: "02", title: "C扫B-预下单", sub: "precreate → qr_code → 轮询，覆盖扫码收银台。", time: "8 分钟", scenario: "sc-c2b-precreate" },
    { n: "03", title: "公众号支付", sub: "微信浏览器内 wap_pay_request 调起支付。", time: "10 分钟", scenario: "sc-official-account" },
    { n: "04", title: "交易事件通知验签", sub: "解析 Authorization、base64 decode、SHA256WithRSA。", time: "6 分钟", scenario: "sc-event-notify" },
  ];

  return (
    <div className="article">
      <div className="home-hero">
        <div className="eyebrow">Documentation</div>
        <h1 className="home-title">一站式移动支付接入。</h1>
        <p className="home-lede">
          面向服务商与 ISV 的收钱吧 Web API 文档。覆盖支付宝、微信、云闪付等渠道的 16 个具名场景——每个场景都配有独立的 Quickstart、关键接口、注意事项与验收入口。
        </p>
      </div>

      <div className="task-bar">
        {TASKS.map((t) => (
          <div key={t.title} className="task-cell" onClick={t.onClick}>
            <div className="label">{t.label}</div>
            <div className="title">{t.title}</div>
            <div className="desc">{t.desc}</div>
            <div className="arrow">
              <Icons.ArrowUpRight size={14} stroke={1.7} />
            </div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>产品与能力</h2>
        <span className="meta">6 个模块 · 16 个场景</span>
      </div>
      <div className="module-grid">
        {MODULES.map((m) => {
          const I = Icons[m.icon];
          const count = scenariosByModule(m.id).length;
          return (
            <div key={m.id} className="module-card" onClick={() => onSelectModule(m.id)}>
              <div className="mc-head">
                <span className="mc-icon">
                  <I size={15} stroke={1.6} />
                </span>
                <span className="mc-title">
                  {m.title} <span style={{ color: "var(--fg-faint)", fontWeight: 500 }}>· {count} 场景</span>
                </span>
              </div>
              <p className="mc-desc">{m.desc}</p>
              <div className="mc-links">
                {m.links.map((l) => (
                  <a key={l} href="#" onClick={(e) => e.preventDefault()}>
                    {l} <Icons.ArrowRight size={11} stroke={1.7} />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-header">
        <h2>推荐 Quickstarts</h2>
        <span className="meta">按接入顺序</span>
      </div>
      <div className="qs-list">
        {QUICKSTARTS.map((q) => (
          <div key={q.n} className="qs-row" onClick={() => onSelectModule(
            q.scenario === "sc-b2c" ? "mod-checkout"
            : q.scenario === "sc-c2b-precreate" ? "mod-checkout"
            : q.scenario === "sc-official-account" ? "mod-online"
            : q.scenario === "sc-event-notify" ? "mod-notify"
            : "mod-checkout"
          )}>
            <div className="qs-num">{q.n}</div>
            <div>
              <div className="qs-title">{q.title}</div>
              <div className="qs-sub">{q.sub}</div>
            </div>
            <div className="qs-meta">
              <Icons.Clock size={15} stroke={1.7} /> &nbsp;{q.time}
            </div>
            <div className="qs-arrow">
              <Icons.ArrowRight size={14} stroke={1.6} />
            </div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>支持与排障</h2>
        <span className="meta">解决线上问题</span>
      </div>
      <div className="support-strip">
        <div className="support-card">
          <div className="sc-title">业务结果码速查</div>
          <div className="sc-desc">PAY_SUCCESS / PAY_FAIL / PAY_IN_PROGRESS 等状态含义与应对动作。</div>
        </div>
        <div className="support-card">
          <div className="sc-title">集成 Q&A</div>
          <div className="sc-desc">小程序主体、App 支付不推荐、轮询与兜底等真实对接坑的解答。</div>
        </div>
        <div className="support-card">
          <div className="sc-title">接入域名</div>
          <div className="sc-desc">国内 vsi-api.shouqianba.com · 马来 · 新加坡三地接入点。</div>
        </div>
      </div>
    </div>
  );
}
