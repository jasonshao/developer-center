import { Icons } from "../components/icons";
import { SCENARIO_BY_ID, type Scenario } from "../data/scenarios";
import { BScanC } from "./guides/BScanC";
import { CScanBPrecreate } from "./guides/CScanBPrecreate";

type Props = { scenarioId: string; onBack: () => void };

export function ScenarioPage({ scenarioId, onBack }: Props) {
  const scenario = SCENARIO_BY_ID[scenarioId];

  if (!scenario) {
    return (
      <div className="article">
        <div className="crumbs">
          <span>
            <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>文档</a>
          </span>
          <span className="current">未知场景</span>
        </div>
        <h1 className="page-title">场景不存在</h1>
        <p className="page-lede">未找到 id 为 <code>{scenarioId}</code> 的场景。请从左侧列表重新选择。</p>
      </div>
    );
  }

  // Deep scenarios with full Quickstart prose
  if (scenario.id === "sc-b2c") return <BScanC onBack={onBack} />;
  if (scenario.id === "sc-c2b-precreate") return <CScanBPrecreate onBack={onBack} />;

  return <SummaryScenario scenario={scenario} onBack={onBack} />;
}

function StatusBadge({ status }: { status: Scenario["status"] }) {
  const map = {
    recommended: { label: "推荐", cls: "ok" },
    deprecated: { label: "不推荐", cls: "warn" },
    beta: { label: "Beta", cls: "info" },
  } as const;
  const m = map[status];
  const bg =
    status === "recommended" ? "#dcfce7"
    : status === "deprecated" ? "#fef3c7"
    : "#e0f2fe";
  const fg =
    status === "recommended" ? "#15803d"
    : status === "deprecated" ? "#b45309"
    : "#0369a1";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 999,
        background: bg,
        color: fg,
        fontWeight: 600,
        fontSize: "calc(var(--article-size, 16.5px) - 2px)",
        marginLeft: 10,
        verticalAlign: "middle",
      }}
    >
      {m.label}
    </span>
  );
}

function SummaryScenario({ scenario, onBack }: { scenario: Scenario; onBack: () => void }) {
  const moduleTitle: Record<string, string> = {
    "mod-checkout": "收款接入",
    "mod-online": "线上支付",
    "mod-mp": "小程序支付",
    "mod-split": "收付通",
    "mod-notify": "通知与签名",
    "mod-ops": "验收与排障",
  };

  const isDeprecated = scenario.status === "deprecated";

  return (
    <article className="article">
      <div className="crumbs">
        <span>
          <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>文档</a>
        </span>
        <span>{moduleTitle[scenario.moduleId] || "接入指南"}</span>
        <span className="current">{scenario.title}</span>
      </div>

      <h1 className="page-title">
        {scenario.title}
        <StatusBadge status={scenario.status} />
      </h1>
      <p className="page-lede">{scenario.summary}</p>

      {isDeprecated && (
        <div className="callout warn">
          <span className="ci"><Icons.Warn size={16} /></span>
          <div className="ct">
            <strong>该场景官方不推荐</strong>
            新接入请评估其他替代方案；历史商户在迁移前请联系技术对接人。
          </div>
        </div>
      )}

      <h2>何时使用</h2>
      <ul>
        {scenario.whenToUse.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>

      <h2>关键接口</h2>
      <div className="api-list">
        {scenario.endpoints.map((e) => (
          <div key={e.path} className="api-row">
            <span className={`api-method m-${e.method.toLowerCase()}`}>{e.method}</span>
            <span className="api-path">{e.path}</span>
            <span className="api-desc">{e.purpose}</span>
            <Icons.ArrowRight size={13} stroke={1.6} />
          </div>
        ))}
      </div>

      <h2>注意事项</h2>
      {scenario.notes.map((n, i) => (
        <div key={i} className="callout" style={{ marginBottom: 10 }}>
          <span className="ci"><Icons.Info size={16} /></span>
          <div className="ct">{n}</div>
        </div>
      ))}

      {scenario.acceptanceDoc && (
        <>
          <h2>验收</h2>
          <div className="support-strip">
            <div className="support-card">
              <div className="sc-title">验收表已提供</div>
              <div className="sc-desc">
                <code>{scenario.acceptanceDoc}</code> —— 联系技术对接人领取完整 Excel。
              </div>
            </div>
          </div>
        </>
      )}

      <h2>下一步</h2>
      <ul>
        <li>
          查看 <a className="inline" href="#">{scenario.title} · API 参考</a> 获取完整字段定义。
        </li>
        <li>
          对照 <a className="inline" href="#">业务结果码</a> 做业务层兜底。
        </li>
        <li>
          跳回 <a className="inline" href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>文档首页</a>。
        </li>
      </ul>
    </article>
  );
}
