import { useEffect, useState } from "react";
import { CodeBlock } from "../../components/CodeBlock";
import { Icons } from "../../components/icons";

type Props = { onBack: () => void };

const SECTIONS = [
  { id: "intro", label: "概述", level: 2 },
  { id: "prereq", label: "前置准备", level: 2 },
  { id: "step-activate", label: "1. 激活终端", level: 2 },
  { id: "step-checkin", label: "2. 签到换密钥", level: 2 },
  { id: "step-pay", label: "3. 条码支付", level: 2 },
  { id: "step-query", label: "4. 查询与轮询", level: 2 },
  { id: "callback", label: "回调异步通知", level: 2 },
  { id: "pitfalls", label: "常见失败点", level: 2 },
  { id: "next", label: "下一步", level: 2 },
];

export function BScanC({ onBack }: Props) {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const headings = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!headings.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: [0, 1] }
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    setActive(id);
  };

  return (
    <>
      <article className="article">
        <div className="crumbs">
          <span>
            <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>文档</a>
          </span>
          <span>收款接入</span>
          <span className="current">B扫C · Quickstart</span>
        </div>

        <h1 className="page-title">B扫C 付款码支付 Quickstart</h1>
        <p className="page-lede">
          按协议跑通一笔条码支付：激活换取终端密钥、每日签到刷新密钥、店员扫顾客付款码发起支付，并在非最终态下轮询查询订单最终状态。
        </p>

        <div style={{ display: "flex", gap: 10, marginBottom: 48 }}>
          <button className="btn btn-primary"><Icons.Play size={12} /> 在测试环境运行</button>
          <button className="btn btn-ghost"><Icons.Github size={13} /> 查看示例仓库</button>
        </div>

        <h2 id="intro">概述</h2>
        <p>
          统一入口：<code>https://vsi-api.shouqianba.com</code>。所有请求使用 HTTPS POST +{" "}
          <code>application/json</code>、UTF-8 编码，金额单位统一为<strong>分</strong>。
        </p>
        <p>核心链路：<strong>激活</strong>（一次）→ <strong>签到</strong>（每自然日一次）→ <strong>交易</strong>。</p>

        <h2 id="prereq">前置准备</h2>
        <ul>
          <li>从技术对接人处获取 <code>vendor_sn</code>、<code>vendor_key</code> 与 <code>app_id</code>。</li>
          <li>在商户平台门店下生成<strong>激活码 (code)</strong>，同一门店多终端可共用。</li>
          <li>商户侧设备标识 <code>device_id</code>，推荐格式<code>品牌+门店+POS号</code>。</li>
          <li>公网可达的 <code>notify_url</code>（本地调试可用 ngrok）。</li>
        </ul>

        <div className="callout">
          <span className="ci"><Icons.Info size={16} /></span>
          <div className="ct">
            <strong>签名规则</strong>
            请求签名 <code>sign = MD5(body + key)</code>。激活接口使用 vendor_key；其他接口使用 terminal_key。Header 格式：<code>Authorization: sn + " " + sign</code>。
          </div>
        </div>

        <h2 id="step-activate">1. 激活终端</h2>
        <p>
          调用 <code>POST /terminal/activate</code>，用激活码换取 <code>terminal_sn</code> 与 <code>terminal_key</code>。
        </p>

        <CodeBlock
          tabs={["curl"]}
          lang="bash"
          code={[
            { t: "c", v: "# 终端激活 · vendor 签名" },
            { t: "f", v: "curl" },
            { t: "p", v: " -X " }, { t: "s", v: '"POST"' },
            { t: "p", v: " \\\n  " }, { t: "s", v: '"https://vsi-api.shouqianba.com/terminal/activate"' },
            { t: "p", v: " \\\n  -H " }, { t: "s", v: '"Authorization: <vendor_sn> <sign>"' },
            { t: "p", v: " \\\n  -H " }, { t: "s", v: '"Content-Type: application/json"' },
            { t: "p", v: " \\\n  -d " },
            { t: "s", v: "'{\n    \"app_id\": \"<your_app_id>\",\n    \"code\": \"<activation_code>\",\n    \"device_id\": \"ZARA001P01\"\n  }'" },
          ]}
        />

        <h2 id="step-checkin">2. 签到换密钥</h2>
        <p>
          <code>terminal_key</code> 每自然日过期。在当日首次调用核心支付接口前，请先调用{" "}
          <code>POST /terminal/checkin</code> 刷新密钥；签到响应丢失可用旧 key 重发。
        </p>

        <h2 id="step-pay">3. 条码支付</h2>
        <p>
          店员扫描顾客出示的付款码 (<code>dynamic_id</code>)，调用{" "}
          <code>POST /upay/v2/pay</code> 发起支付。使用 terminal_key 签名。
        </p>

        <CodeBlock
          tabs={["curl"]}
          lang="bash"
          code={[
            { t: "c", v: "# 条码支付 (B扫C) · terminal 签名" },
            { t: "f", v: "curl" },
            { t: "p", v: " -X " }, { t: "s", v: '"POST"' },
            { t: "p", v: " \\\n  " }, { t: "s", v: '"https://vsi-api.shouqianba.com/upay/v2/pay"' },
            { t: "p", v: " \\\n  -H " }, { t: "s", v: '"Authorization: <terminal_sn> <sign>"' },
            { t: "p", v: " \\\n  -H " }, { t: "s", v: '"Content-Type: application/json"' },
            { t: "p", v: " \\\n  -d " },
            { t: "s", v: "'{\n    \"terminal_sn\": \"10298371039\",\n    \"client_sn\": \"" },
            { t: "n", v: "ORDER20260419001" },
            { t: "s", v: "\",\n    \"total_amount\": \"100\",\n    \"dynamic_id\": \"134567890123456789\",\n    \"subject\": \"测试商品\",\n    \"operator\": \"cashier01\"\n  }'" },
          ]}
        />

        <table className="param-table">
          <thead><tr><th>字段</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td>terminal_sn<div className="pt-type">string · ≤ 32</div></td>
              <td><div className="pt-desc">收钱吧终端 ID<span className="pt-required">必填</span>。</div></td></tr>
            <tr><td>client_sn<div className="pt-type">string · ≤ 32</div></td>
              <td><div className="pt-desc">商户系统订单号<span className="pt-required">必填</span>。系统内唯一，<strong>失败后不可复用</strong>。</div></td></tr>
            <tr><td>total_amount<div className="pt-type">string (分)</div></td>
              <td><div className="pt-desc">交易金额<span className="pt-required">必填</span>，以分为单位。<code>"100"</code> = 1.00 元。</div></td></tr>
            <tr><td>dynamic_id<div className="pt-type">string · ≤ 32</div></td>
              <td><div className="pt-desc">顾客付款码<span className="pt-required">必填</span>，有效期 <strong>1 分钟</strong>。</div></td></tr>
            <tr><td>subject<div className="pt-type">string · ≤ 64</div></td>
              <td><div className="pt-desc">交易简述<span className="pt-required">必填</span>。会在支付宝/微信账单中展示。</div></td></tr>
          </tbody>
        </table>

        <h2 id="step-query">4. 查询与轮询</h2>
        <p>
          pay 同步返回的 <code>order_status</code> 若不是最终态，需立即开始轮询。调用{" "}
          <code>POST /upay/v2/query</code>，以 <code>sn</code> 或 <code>client_sn</code> 查询。
        </p>
        <p>推荐节奏：<strong>每 3-5s 轮询一次，总时长 40-50s</strong>。</p>
        <div className="callout">
          <span className="ci"><Icons.Info size={16} /></span>
          <div className="ct">
            <strong>最终订单状态（5 个）</strong>
            <code>PAID</code> / <code>PAY_CANCELED</code> / <code>REFUNDED</code> /{" "}
            <code>PARTIAL_REFUNDED</code> / <code>CANCELED</code>。其他状态需继续轮询。
          </div>
        </div>

        <h2 id="callback">回调异步通知</h2>
        <p>
          支付状态变化会向你的 <code>notify_url</code> 推送。必须在 3 秒内返回 success，
          否则按指数退避重试。
        </p>
        <div className="callout warn">
          <span className="ci"><Icons.Warn size={16} /></span>
          <div className="ct">
            <strong>回调使用 RSA 验签，不是 MD5</strong>
            Header <code>Authorization</code> 里的 sign 先 <strong>base64 decode</strong>，再用收钱吧 X509 公钥按{" "}
            <code>SHA256WithRSA</code> 验证 body。<strong>回调态不保证为最终态</strong>——验签通过后仍需查 query 并对照 5 个终态。
          </div>
        </div>

        <h2 id="pitfalls">常见失败点</h2>
        <ul>
          <li><strong>签名错误 ej26</strong> — 激活用 vendor_key，其他接口用 terminal_key；每日首次支付前先 checkin。</li>
          <li><strong>回调收不到</strong> — notify_url 需公网可达；回调用 RSA，不是 MD5。</li>
          <li><strong>订单号复用</strong> — <code>client_sn</code> 系统内唯一，失败也不可复用。</li>
          <li><strong>撤单与退款</strong> — 撤单当天一次全额；已退款订单不可撤单。</li>
        </ul>

        <h2 id="next">下一步</h2>
        <ul>
          <li>完成<a className="inline" href="#">B扫C 交易场景验收表</a>后再上线。</li>
          <li>对照<a className="inline" href="#">业务结果码</a>做业务层兜底提示。</li>
          <li>如需顾客扫码场景，继续阅读 <a className="inline" href="#">C扫B-预下单</a>。</li>
        </ul>
      </article>

      <nav className="toc" aria-label="On this page">
        <div className="toc-label">本页目录</div>
        <ul className="toc-list">
          {SECTIONS.map((s) => (
            <li key={s.id} className={s.level === 3 ? "lvl-3" : ""}>
              <a href={`#${s.id}`} className={active === s.id ? "is-active" : ""}
                onClick={(e) => { e.preventDefault(); jumpTo(s.id); }}>{s.label}</a>
            </li>
          ))}
        </ul>
        <div className="toc-footer">
          <a href="#"><Icons.External size={11} stroke={1.6} /> &nbsp;在 GitHub 上编辑</a>
          <span>更新于 2026-04-19</span>
        </div>
      </nav>
    </>
  );
}
