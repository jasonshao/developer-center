import { useEffect, useState } from "react";
import { CodeBlock } from "../../components/CodeBlock";
import { Icons } from "../../components/icons";

type Props = { onBack: () => void };

const SECTIONS = [
  { id: "intro", label: "概述", level: 2 },
  { id: "prereq", label: "前置准备", level: 2 },
  { id: "step-precreate", label: "1. 生成二维码", level: 2 },
  { id: "step-display", label: "2. 展示并等待支付", level: 2 },
  { id: "step-poll", label: "3. 轮询最终态", level: 2 },
  { id: "sub-payway", label: "sub_payway 对照", level: 2 },
  { id: "pitfalls", label: "常见失败点", level: 2 },
  { id: "next", label: "下一步", level: 2 },
];

export function CScanBPrecreate({ onBack }: Props) {
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
          <span className="current">C扫B · 预下单</span>
        </div>

        <h1 className="page-title">C扫B 预下单 Quickstart</h1>
        <p className="page-lede">
          动态生成可扫描的二维码让顾客完成支付。<code>precreate</code> 是 H5、小程序、App 等线上场景的公共前置接口——本文以最常用的扫码收银台场景为例。
        </p>

        <div style={{ display: "flex", gap: 10, marginBottom: 48 }}>
          <button className="btn btn-primary"><Icons.Play size={12} /> 在测试环境运行</button>
          <button className="btn btn-ghost"><Icons.Github size={13} /> 查看示例仓库</button>
        </div>

        <h2 id="intro">概述</h2>
        <p>
          调用 <code>POST /upay/v2/precreate</code> 返回 <code>qr_code</code> 与{" "}
          <code>sn</code>。商户把 <code>qr_code</code> 渲染为二维码展示给顾客；顾客扫码后在支付宝/微信内完成支付；商户轮询 <code>query</code> 直到订单落入最终态。
        </p>

        <h2 id="prereq">前置准备</h2>
        <ul>
          <li>已激活的 <code>terminal_sn</code> + 最新 <code>terminal_key</code>（本日已 checkin）。</li>
          <li>前端渲染二维码的能力（<code>qrcode.js</code> 等）。</li>
          <li>公网可达的 <code>notify_url</code>。</li>
        </ul>

        <div className="callout">
          <span className="ci"><Icons.Info size={16} /></span>
          <div className="ct">
            <strong>重要约束</strong>
            <code>qr_code</code> 的有效期为 <strong>4 分钟</strong>，过期后必须重新 precreate，<strong>不可修改</strong>现有码。建议用户进入支付页时再生成，而不是预生成。
          </div>
        </div>

        <h2 id="step-precreate">1. 生成二维码</h2>
        <p>
          以扫码收银台为例（payway=2 支付宝 + payway=3 微信 自适应场景）：
        </p>

        <CodeBlock
          tabs={["curl"]}
          lang="bash"
          code={[
            { t: "c", v: "# 预下单 (C扫B) · terminal 签名" },
            { t: "f", v: "curl" },
            { t: "p", v: " -X " }, { t: "s", v: '"POST"' },
            { t: "p", v: " \\\n  " }, { t: "s", v: '"https://vsi-api.shouqianba.com/upay/v2/precreate"' },
            { t: "p", v: " \\\n  -H " }, { t: "s", v: '"Authorization: <terminal_sn> <sign>"' },
            { t: "p", v: " \\\n  -H " }, { t: "s", v: '"Content-Type: application/json"' },
            { t: "p", v: " \\\n  -d " },
            { t: "s", v: "'{\n    \"terminal_sn\": \"10298371039\",\n    \"client_sn\": \"" },
            { t: "n", v: "ORDER20260419100" },
            { t: "s", v: "\",\n    \"total_amount\": \"100\",\n    \"subject\": \"收银台支付\",\n    \"operator\": \"cashier01\"\n  }'" },
          ]}
        />

        <CodeBlock
          tabs={["Response"]}
          lang="json"
          code={[
            { t: "p", v: "{\n  " }, { t: "key", v: '"result_code"' }, { t: "p", v: ": " }, { t: "s", v: '"PRECREATE_SUCCESS"' }, { t: "p", v: ",\n  " },
            { t: "key", v: '"biz_response"' }, { t: "p", v: ": {\n    " },
            { t: "key", v: '"data"' }, { t: "p", v: ": {\n      " },
            { t: "key", v: '"sn"' }, { t: "p", v: ": " }, { t: "s", v: '"7654321987654321"' }, { t: "p", v: ",\n      " },
            { t: "key", v: '"qr_code"' }, { t: "p", v: ": " }, { t: "s", v: '"https://qr.shouqianba.com/app/7654321987654321"' }, { t: "p", v: ",\n      " },
            { t: "key", v: '"order_status"' }, { t: "p", v: ": " }, { t: "s", v: '"CREATED"' }, { t: "p", v: "\n    }\n  }\n}" },
          ]}
        />

        <h2 id="step-display">2. 展示并等待支付</h2>
        <p>
          把 <code>qr_code</code> 字符串编码为二维码图片展示给顾客。同时记录返回的 <code>sn</code>，用于后续查询。
        </p>

        <h2 id="step-poll">3. 轮询最终态</h2>
        <p>
          precreate 后应立即开始轮询 <code>POST /upay/v2/query</code>，推荐节奏：
        </p>
        <ul>
          <li>前 30 秒每 <strong>2 秒</strong>轮询一次</li>
          <li>30 秒后切换为每 <strong>5 秒</strong>轮询一次</li>
          <li>总时长 <strong>100-120 秒</strong>；超时视作用户未支付，可 precreate 新订单</li>
        </ul>

        <h2 id="sub-payway">sub_payway 对照</h2>
        <p>
          precreate 是多场景共享的前置接口——通过 <code>payway</code> + <code>sub_payway</code> 区分调起方式：
        </p>
        <table className="param-table">
          <thead><tr><th>场景</th><th>payway / sub_payway</th></tr></thead>
          <tbody>
            <tr><td>C扫B 扫码收银台<div className="pt-type">本页示例</div></td>
              <td><div className="pt-desc">不传 payway，由收钱吧自适配。</div></td></tr>
            <tr><td>公众号 / 微信内 H5<div className="pt-type">wap_pay_request</div></td>
              <td><div className="pt-desc">payway=3, sub_payway=3</div></td></tr>
            <tr><td>外部浏览器 H5<div className="pt-type">跳起支付宝/微信</div></td>
              <td><div className="pt-desc">sub_payway=6</div></td></tr>
            <tr><td>小程序支付<div className="pt-type">需主体一致</div></td>
              <td><div className="pt-desc">payway=3, sub_payway=4, extended.sub_appid</div></td></tr>
            <tr><td>小程序微企付<div className="pt-type">B2B 小程序</div></td>
              <td><div className="pt-desc">sub_payway=27</div></td></tr>
            <tr><td>App 支付<div className="pt-type">不推荐</div></td>
              <td><div className="pt-desc">sub_payway=5（仅直连）</div></td></tr>
          </tbody>
        </table>

        <h2 id="pitfalls">常见失败点</h2>
        <ul>
          <li><strong>二维码过期</strong> — 4 分钟硬限制，超时必须重新 precreate。</li>
          <li><strong>小程序主体不一致</strong> — 小程序 AppID 的主体必须与入网商户同一主体，否则微信/支付宝直接拒付。</li>
          <li><strong>用 return_url 确认支付</strong> — return_url 不保证回跳，<strong>必须</strong>以 notify_url + query 为准。</li>
          <li><strong>订单号重复</strong> — 失败后的 client_sn 不可复用，要生成新的。</li>
        </ul>

        <h2 id="next">下一步</h2>
        <ul>
          <li>阅读 <a className="inline" href="#">回调验签 (RSA)</a> 实施最终态校验。</li>
          <li>H5 / 小程序场景的适配见 <a className="inline" href="#">线上支付</a> 与 <a className="inline" href="#">小程序支付</a> 模块。</li>
          <li>完成 <a className="inline" href="#">C扫B-预下单验收表</a> 后再上线。</li>
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
