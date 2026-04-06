const steps = [
  ["场景判断", "先判断你的业务属于哪条接入路线。"],
  ["接入准备", "整理账号、密钥、回调和验收前置材料。"],
  ["最小可跑通链路", "优先完成第一笔成功交易。"],
  ["验收与上线", "进入验收文档、FAQ 和排障支持。"]
];

export function QuickstartSteps() {
  return (
    <section className="section-block" id="quickstart">
      <div className="container">
        <h2>首次接入推荐路径</h2>
        <div className="step-grid">
          {steps.map(([title, detail]) => (
            <article key={title} className="step-card">
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
