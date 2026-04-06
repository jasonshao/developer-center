import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchRouteEntries } from "../utils/search";

type HeroProps = {
  onStartClick?: () => void;
};

export function Hero({ onStartClick }: HeroProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstRouteResult = searchRouteEntries(query).find(
      (result) => result.type === "route"
    );

    if (firstRouteResult) {
      navigate(firstRouteResult.href);
    }
  }

  return (
    <section className="hero-section">
      <div className="container hero-section__inner">
        <span className="hero-section__eyebrow">服务商 / ISV 首次接入</span>
        <h1>先找到你的接入路线，再快速跑通第一笔交易</h1>
        <p>
          首页先帮你判断该走哪条接入路径，再进入对应 Quickstart、验收文档、FAQ 和
          API 参考。
        </p>

        <form className="hero-search" onSubmit={handleSubmit}>
          <input
            aria-label="搜索场景、API 或 FAQ"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="试试搜索：公众号支付、B扫C、收付通开户"
          />
          <button type="submit" className="button button--primary">
            搜索
          </button>
        </form>

        <div className="hero-section__actions">
          <button type="button" className="button button--primary" onClick={onStartClick}>
            开始接入
          </button>
          <a className="button button--secondary" href="#primary-routes">
            查看 5 条主路线
          </a>
          <a className="button button--secondary" href="#direct-links">
            搜索场景 / API / FAQ
          </a>
        </div>
      </div>
    </section>
  );
}
