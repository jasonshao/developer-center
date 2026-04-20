import { Icons } from "../components/icons";

const GROUPS: { title: string; endpoints: { m: "GET" | "POST"; p: string; d: string }[] }[] = [
  {
    title: "终端与激活",
    endpoints: [
      { m: "POST", p: "/terminal/activate", d: "用激活码换取 terminal_sn / terminal_key（vendor 签名）" },
      { m: "POST", p: "/terminal/checkin", d: "每自然日刷新 terminal_key" },
    ],
  },
  {
    title: "核心交易",
    endpoints: [
      { m: "POST", p: "/upay/v2/pay", d: "条码支付 (B扫C)" },
      { m: "POST", p: "/upay/v2/precreate", d: "预下单 / 生成 qr_code / 多场景共享前置" },
      { m: "POST", p: "/upay/v2/query", d: "按 sn / client_sn 查询订单" },
      { m: "POST", p: "/upay/v2/refund", d: "发起退款（可多次累计）" },
      { m: "POST", p: "/upay/v2/cancel", d: "撤单（当天一次全额）" },
    ],
  },
  {
    title: "线上支付",
    endpoints: [{ m: "POST", p: "/upay/v2/wap", d: "C扫B-PRO 跳转收银台" }],
  },
  {
    title: "刷脸支付",
    endpoints: [
      { m: "POST", p: "/upay/support/getWxpayfaceAuthinfo", d: "获取微信刷脸授权 info" },
      { m: "POST", p: "/upay/v2/pay", d: "刷脸支付（按刷脸 payway / sub_payway）" },
    ],
  },
  {
    title: "收付通",
    endpoints: [
      { m: "POST", p: "/openapi/merchant/apply", d: "二级商户开户申请" },
      { m: "POST", p: "/openapi/merchant/query", d: "开户状态查询" },
      { m: "POST", p: "/openapi/trade/create", d: "分账场景交易" },
      { m: "POST", p: "/openapi/split/apply", d: "提交分账" },
      { m: "POST", p: "/openapi/split/query", d: "查询分账结果" },
    ],
  },
  {
    title: "智慧门店开放平台（Beta）",
    endpoints: [
      { m: "POST", p: "/openapi/smartstore/*", d: "门店级开放能力（会员 / 订单 / 小票）" },
    ],
  },
  {
    title: "通知",
    endpoints: [
      { m: "POST", p: "{notify_url}", d: "商户侧接收回调，RSA SHA256WithRSA 验签" },
    ],
  },
];

const SUB_PAYWAY = [
  { scenario: "C扫B 扫码收银台", payway: "不传（自适配）", sub: "—" },
  { scenario: "公众号 / 微信内 H5", payway: "3 (微信)", sub: "3" },
  { scenario: "外部浏览器 H5", payway: "2 / 3", sub: "6" },
  { scenario: "小程序支付", payway: "3 (微信)", sub: "4 + extended.sub_appid" },
  { scenario: "小程序微企付", payway: "3", sub: "27" },
  { scenario: "App 支付（不推荐）", payway: "3", sub: "5（仅直连）" },
];

export function ApiIndexPage() {
  return (
    <div className="article">
      <div className="crumbs">
        <span>API 参考</span>
        <span className="current">索引</span>
      </div>
      <h1 className="page-title">API 参考</h1>
      <p className="page-lede">
        统一接入域名 <code>https://vsi-api.shouqianba.com</code>。所有请求 HTTPS POST +{" "}
        <code>application/json</code>，UTF-8 编码，金额单位为<strong>分</strong>。请求用 MD5 签名，回调用 RSA SHA256WithRSA 验签。
      </p>

      {GROUPS.map((g) => (
        <div key={g.title}>
          <h2>{g.title}</h2>
          <div className="api-list">
            {g.endpoints.map((e, i) => (
              <div key={`${e.p}-${i}`} className="api-row">
                <span className={`api-method m-${e.m.toLowerCase()}`}>{e.m}</span>
                <span className="api-path">{e.p}</span>
                <span className="api-desc">{e.d}</span>
                <Icons.ArrowRight size={13} stroke={1.6} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2>precreate · sub_payway 对照</h2>
      <p className="muted">
        <code>precreate</code> 是多场景共享的前置接口，通过 <code>payway</code> + <code>sub_payway</code> 区分调起方式：
      </p>
      <table className="param-table">
        <thead>
          <tr>
            <th>场景</th>
            <th>payway / sub_payway</th>
          </tr>
        </thead>
        <tbody>
          {SUB_PAYWAY.map((r) => (
            <tr key={r.scenario}>
              <td>{r.scenario}<div className="pt-type">{r.payway}</div></td>
              <td><div className="pt-desc">sub_payway = {r.sub}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
