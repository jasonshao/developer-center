import { Icons } from "../components/icons";

const THEMES: { title: string; rows: { t: string; d: string; tag: string }[] }[] = [
  {
    title: "1 · 环境与验收",
    rows: [
      {
        t: "测试商户如何申请？",
        d: "找技术对接人拿测试商户账号与激活码；测试商户有使用期限，过期后需要续期。",
        tag: "测试",
      },
      {
        t: "验收流程是什么？",
        d: "填写对应场景的 Excel 验收表、跑通关键用例、提交技术对接人审核通过后才可上生产。",
        tag: "验收",
      },
      {
        t: "开发参数怎么拿？",
        d: "SPA 平台 → vendor_sn / vendor_key；OP 平台 → app_id；商户平台门店下生成激活码。",
        tag: "凭证",
      },
    ],
  },
  {
    title: "2 · return_url vs notify_url",
    rows: [
      {
        t: "两者区别？",
        d: "return_url 只是支付完成后用户端回跳的 UI 跳转，**不保证到达**；notify_url 是收钱吧服务端异步推送，保证最终送达（会重试）。",
        tag: "回调",
      },
      {
        t: "用哪个判断支付成功？",
        d: "**只能以 notify_url + 主动 query 为准**。return_url 只用于用户侧页面体验，绝不可作为业务确认依据。",
        tag: "回调",
      },
    ],
  },
  {
    title: "3 · 二维码与有效期",
    rows: [
      {
        t: "付款码 dynamic_id 多久过期？",
        d: "**1 分钟**，从用户展示开始计时。pay 时如超时会返回失败，需让用户重新打开付款码。",
        tag: "B扫C",
      },
      {
        t: "precreate 二维码多久过期？",
        d: "**4 分钟**。过期后必须重新 precreate，**不可**修改原 qr_code，也不可延期。",
        tag: "C扫B",
      },
      {
        t: "precreate 应该在什么时机调用？",
        d: "用户进入支付页时再调——避免预生成导致 4 分钟白白流失。",
        tag: "C扫B",
      },
    ],
  },
  {
    title: "4 · 小程序与 App",
    rows: [
      {
        t: "小程序支付主体必须一致？",
        d: "**小程序 AppID 的主体必须与入网商户同一主体**。这是微信/支付宝的政策硬约束，参数绕不过。测试商户无法联调小程序。",
        tag: "小程序",
      },
      {
        t: "App 支付为何不推荐？",
        d: "官方仅保留直连 API，不对常规接入开放。推荐在 App 内调用 C扫B-预下单生成二维码、让用户跳转或展示给第二设备扫。",
        tag: "App",
      },
    ],
  },
  {
    title: "5 · 终端与签名",
    rows: [
      {
        t: "签名错误 ej26 怎么查？",
        d: "四步：(1) 必填参数是否全传；(2) 有无多传字段；(3) 字段类型是否匹配；(4) 是否用了**最新的** terminal_key（每日 checkin 后会更新）。",
        tag: "签名",
      },
      {
        t: "激活码能用几次？",
        d: "每个激活码有使用次数与有效期双重限制，过期或用尽需要在商户平台门店下重新生成。",
        tag: "终端",
      },
      {
        t: "为什么要每日 checkin？",
        d: "terminal_key 每自然日过期一次。建议在每天首笔支付前自动 checkin 刷新密钥。签到响应丢了可用旧 key 重发。",
        tag: "终端",
      },
    ],
  },
  {
    title: "6 · 退款与交易态",
    rows: [
      {
        t: "退款失败提示余额不足？",
        d: "退款只能从未清算的当日余额退。如果余额不够，需在商户平台的结算规则里预留备付金用于退款兜底。",
        tag: "退款",
      },
      {
        t: "最终交易态有哪些？",
        d: "共 5 个：PAID / PAY_CANCELED / REFUNDED / PARTIAL_REFUNDED / CANCELED。其他状态（CREATED、PAY_IN_PROGRESS 等）都要继续轮询。",
        tag: "状态机",
      },
      {
        t: "撤单 vs 退款？",
        d: "撤单：当天一次、全额、退手续费；已退款订单不可撤单。退款：可多次累计到 0、按比例退手续费。",
        tag: "退款",
      },
      {
        t: "顾客付款时我正在调撤单怎么办？",
        d: "典型竞态——撤单成功 + 顾客确实已付会触发同时 cancel + refund 两条路径。业务侧必须对 client_sn 做幂等保护。",
        tag: "幂等",
      },
    ],
  },
];

const RESULT_CODES = [
  { code: "PAY_SUCCESS", m: "支付成功", next: "交易完成" },
  { code: "PAY_FAIL", m: "支付失败且已冲正", next: "重新发起新订单（新 client_sn）" },
  { code: "PAY_IN_PROGRESS", m: "支付处理中", next: "query 轮询" },
  { code: "PAY_FAIL_ERROR", m: "支付失败，三方状态不确定", next: "联系客服" },
  { code: "PRECREATE_SUCCESS", m: "预下单成功", next: "展示 qr_code 等用户扫码" },
  { code: "REFUND_SUCCESS", m: "退款成功", next: "完成" },
  { code: "REFUND_IN_PROGRESS", m: "退款处理中", next: "继续轮询" },
  { code: "CANCEL_SUCCESS", m: "撤单成功", next: "完成" },
  { code: "CANCEL_IN_PROGRESS", m: "撤单处理中", next: "query 查询" },
];

export function SupportPage() {
  return (
    <div className="article">
      <div className="crumbs">
        <span>支持</span>
        <span className="current">概览</span>
      </div>
      <h1 className="page-title">支持中心</h1>
      <p className="page-lede">
        线上问题定位、业务结果码、6 大主题的集成 Q&A，以及联系技术对接的方式。
      </p>

      {THEMES.map((theme) => (
        <div key={theme.title}>
          <h2>{theme.title}</h2>
          <div className="support-list">
            {theme.rows.map((r) => (
              <div key={r.t} className="sup-row">
                <div>
                  <div className="sup-title">{r.t}</div>
                  <div className="sup-desc">{r.d}</div>
                </div>
                <span className="sup-tag">{r.tag}</span>
                <Icons.ArrowRight size={13} stroke={1.6} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2>业务结果码速查</h2>
      <table className="param-table">
        <thead>
          <tr>
            <th>result_code</th>
            <th>含义 / 建议动作</th>
          </tr>
        </thead>
        <tbody>
          {RESULT_CODES.map((r) => (
            <tr key={r.code}>
              <td>
                <code>{r.code}</code>
              </td>
              <td>
                <div className="pt-desc">
                  {r.m} —— {r.next}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>联系我们</h2>
      <div className="support-strip">
        <div className="support-card">
          <div className="sc-title">提交工单</div>
          <div className="sc-desc">带上 vendor_sn、app_id、client_sn 与复现时间，响应更快。</div>
        </div>
        <div className="support-card">
          <div className="sc-title">接入域名</div>
          <div className="sc-desc">
            国内 <code>vsi-api.shouqianba.com</code> · 马来 <code>api.bayarlah.net</code> · 新加坡 <code>api.aimt-horizon.com</code>
          </div>
        </div>
        <div className="support-card">
          <div className="sc-title">更新日志</div>
          <div className="sc-desc">接口变更、行为调整与不兼容改动的记录。</div>
        </div>
      </div>
    </div>
  );
}
