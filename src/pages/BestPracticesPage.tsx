import { Icons } from "../components/icons";

const CARDS = [
  {
    title: "client_sn 与幂等",
    desc: "系统内唯一、**失败后不可复用**；数据库使用整数金额（单位：分），不要用浮点。",
    meta: "6 分钟",
  },
  {
    title: "pay / precreate 轮询节奏",
    desc: "pay：每 3-5s 轮询，总 40-50s。precreate：前期 2s、后期 5s 间隔，总 100-120s。",
    meta: "8 分钟",
  },
  {
    title: "回调 + 主动查询兜底",
    desc: "回调态不保证最终态；验签通过后以 client_sn 主动 query，以收钱吧结果为准，避免单边账。",
    meta: "10 分钟",
  },
  {
    title: "密钥每日 checkin",
    desc: "terminal_key 每自然日过期；当日首笔支付前先 checkin；签到响应丢失可用旧 key 重发。",
    meta: "5 分钟",
  },
  {
    title: "回调 RSA SHA256WithRSA 验签",
    desc: "Authorization header 里的 sign 先 base64 decode；用收钱吧 X509 公钥按 SHA256WithRSA 验 body。",
    meta: "12 分钟",
  },
  {
    title: "return_url vs notify_url",
    desc: "return_url 只是用户回跳，不保证到达；只以 notify_url + query 为业务确认依据。",
    meta: "4 分钟",
  },
  {
    title: "小程序主体一致性",
    desc: "小程序 AppID 主体必须与入网商户同一主体。政策硬约束，参数绕不过。接入前必查。",
    meta: "5 分钟",
  },
  {
    title: "付款码 1min / 预下单 4min",
    desc: "付款码 dynamic_id 有效期 1 分钟；precreate qr_code 有效期 4 分钟，过期必须重新 precreate。",
    meta: "3 分钟",
  },
  {
    title: "退款余额与清算",
    desc: "退款从未清算的当日余额扣；余额不足需在商户平台结算规则里预留备付金。",
    meta: "7 分钟",
  },
  {
    title: "订单状态机",
    desc: "5 个最终态：PAID / PAY_CANCELED / REFUNDED / PARTIAL_REFUNDED / CANCELED。其余持续轮询。",
    meta: "10 分钟",
  },
  {
    title: "撤单 vs 退款",
    desc: "撤单当天一次全额 + 退手续费；已退款订单不可撤单；退款可累计到 0、按比例退手续费。",
    meta: "6 分钟",
  },
];

export function BestPracticesPage() {
  return (
    <div className="article">
      <div className="crumbs">
        <span>最佳实践</span>
        <span className="current">索引</span>
      </div>
      <h1 className="page-title">最佳实践</h1>
      <p className="page-lede">
        从接入完成到稳定上线的过程中，每个团队都会遇到的坑与官方推荐的解决路径。
      </p>
      <div className="practice-grid">
        {CARDS.map((c) => (
          <div key={c.title} className="practice-card">
            <div className="pc-title">{c.title}</div>
            <div className="pc-desc">{c.desc}</div>
            <div className="pc-meta">
              <Icons.Clock size={15} stroke={1.7} /> &nbsp;{c.meta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
