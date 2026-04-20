import { Icons } from "../components/icons";

type NodeProps = {
  title: string;
  desc?: string;
  scenarioId?: string;
  deprecated?: boolean;
  onPick: (scenarioId: string) => void;
};

function Leaf({ title, desc, scenarioId, deprecated, onPick }: NodeProps) {
  return (
    <div
      className="qs-row"
      style={{ cursor: scenarioId ? "pointer" : "default", opacity: deprecated ? 0.75 : 1 }}
      onClick={() => scenarioId && onPick(scenarioId)}
    >
      <div className="qs-num" style={{ width: 28 }}>
        <Icons.ArrowRight size={14} stroke={1.8} />
      </div>
      <div>
        <div className="qs-title">
          {title}
          {deprecated && (
            <span
              style={{
                marginLeft: 8,
                padding: "1px 8px",
                borderRadius: 999,
                background: "#fef3c7",
                color: "#b45309",
                fontSize: "calc(var(--article-size, 16.5px) - 3px)",
                fontWeight: 600,
              }}
            >
              不推荐
            </span>
          )}
        </div>
        {desc && <div className="qs-sub">{desc}</div>}
      </div>
      <div className="qs-arrow">
        <Icons.ArrowRight size={14} stroke={1.6} />
      </div>
    </div>
  );
}

type Props = { onPickScenario: (scenarioId: string) => void };

export function DecisionTreePage({ onPickScenario }: Props) {
  return (
    <div className="article">
      <div className="crumbs">
        <span>接入指南</span>
        <span className="current">场景选择器</span>
      </div>
      <h1 className="page-title">选对场景，再开始接入。</h1>
      <p className="page-lede">
        收钱吧覆盖 16 个支付场景——先按「支付发起方」分流，再按渠道细化。选中任一叶子节点可直接跳到对应场景的 Quickstart。
      </p>

      <div className="section-header">
        <h2>1 · 支付发起方在哪里？</h2>
        <span className="meta">3 条主分流</span>
      </div>

      <h2>线下：店员或顾客面对面扫码</h2>
      <div className="qs-list">
        <Leaf
          title="店员扫顾客付款码 → B扫C"
          desc="POS / 收银台 / 扫码枪，顾客出示付款码，店员扫描。"
          scenarioId="sc-b2c"
          onPick={onPickScenario}
        />
        <Leaf
          title="顾客扫商户二维码（动态） → C扫B 预下单"
          desc="收银台屏幕、小票，按订单动态生成二维码。"
          scenarioId="sc-c2b-precreate"
          onPick={onPickScenario}
        />
        <Leaf
          title="顾客扫商户二维码（跳收银台托管） → C扫B-PRO"
          desc="最轻量，收钱吧托管收银台；商户无需自管收银页面。"
          scenarioId="sc-c2b-pro"
          onPick={onPickScenario}
        />
        <Leaf
          title="刷脸设备 → 刷脸支付"
          desc="依赖微信/支付宝刷脸设备 SDK。"
          scenarioId="sc-face"
          onPick={onPickScenario}
        />
      </div>

      <h2>线上 Web / 移动端</h2>
      <div className="qs-list">
        <Leaf
          title="微信公众号 / 微信浏览器内 → 公众号支付"
          desc="用户从公众号菜单、文章跳到商户 H5 后唤起支付。"
          scenarioId="sc-official-account"
          onPick={onPickScenario}
        />
        <Leaf
          title="手机浏览器（Safari / Chrome） → 浏览器 H5"
          desc="短信 / 广告 / 搜索落地页的移动端支付。"
          scenarioId="sc-mobile-h5"
          onPick={onPickScenario}
        />
        <Leaf
          title="微信 / 支付宝内 H5"
          desc="官方不推荐——微信场景改用公众号支付；支付宝场景改用小程序支付。"
          scenarioId="sc-inapp-h5"
          deprecated
          onPick={onPickScenario}
        />
        <Leaf
          title="原生 App"
          desc="不推荐直接 API 接入——建议改用 C扫B（App 内生成二维码）。"
          scenarioId="sc-app"
          deprecated
          onPick={onPickScenario}
        />
      </div>

      <h2>小程序</h2>
      <div className="callout">
        <span className="ci"><Icons.Info size={16} /></span>
        <div className="ct">
          <strong>先确认小程序主体与收钱吧入网商户一致</strong>
          ——不一致时微信/支付宝会直接拒付，参数绕不过。测试商户无法联调小程序场景。
        </div>
      </div>
      <div className="qs-list">
        <Leaf title="品牌小程序 → 小程序支付" scenarioId="sc-mp" onPick={onPickScenario}
          desc="微信 / 支付宝小程序内调起支付。" />
        <Leaf title="官方插件 → 小程序插件" scenarioId="sc-mp-plugin" onPick={onPickScenario}
          desc="快速接入、无需维护调起代码。" />
        <Leaf title="B2B 对公 → 小程序 B2B 支付" scenarioId="sc-mp-b2b" onPick={onPickScenario}
          desc="企业间在小程序内对公付款。" />
        <Leaf title="小微企业 → 小程序微企付" scenarioId="sc-mp-micro" onPick={onPickScenario}
          desc="小微企业主在小程序内付款。" />
      </div>

      <h2>平台型 ISV / 收付通</h2>
      <div className="qs-list">
        <Leaf title="为下级商户开户 → 收付通开户" scenarioId="sc-split-onboard" onPick={onPickScenario}
          desc="平台统一管理下级商户资质与银行卡。" />
        <Leaf title="交易 + 分账 → 收付通交易" scenarioId="sc-split-trade" onPick={onPickScenario}
          desc="按规则拆分一笔订单的资金给多方。" />
      </div>

      <h2>推送与回调</h2>
      <div className="qs-list">
        <Leaf
          title="实时事件通知 → 交易事件通知"
          desc="RSA SHA256WithRSA 验签；回调态可能非最终态，配合 query 兜底。"
          scenarioId="sc-event-notify"
          onPick={onPickScenario}
        />
      </div>

      <h2>门店开放能力</h2>
      <div className="qs-list">
        <Leaf
          title="会员 / 订单 / 小票 → 智慧门店开放平台"
          desc="Beta，独立签名算法（timestamp + msgId + businessData + nonce + appKey 排序 SHA256）。"
          scenarioId="sc-smart-store"
          onPick={onPickScenario}
        />
      </div>
    </div>
  );
}
