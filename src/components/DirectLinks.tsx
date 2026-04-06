const links = [
  "API 参考",
  "验收文档",
  "FAQ",
  "收付通",
  "事件通知",
  "回调签名"
];

export function DirectLinks() {
  return (
    <section className="section-block" id="direct-links">
      <div className="container">
        <h2>常用直达入口</h2>
        <div className="direct-link-grid">
          {links.map((label, index) => (
            <a
              key={label}
              href={`#direct-link-${index}`}
              className="direct-link-card"
              aria-label={label}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
