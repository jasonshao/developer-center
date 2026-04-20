import { Icons } from "./icons";
import { TABS, type TabName } from "../data/nav";

type Props = { primaryTab: TabName; onNav: (tab: TabName) => void };

export function SiteHeader({ primaryTab, onNav }: Props) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand">
          <div className="brand-mark">S</div>
          <span>Shouqianba</span>
          <span className="brand-divider" />
          <span className="brand-sub">Docs</span>
        </div>

        <nav className="primary-nav" aria-label="Primary">
          {TABS.map((t) => (
            <a
              key={t}
              href="#"
              className={t === primaryTab ? "is-active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onNav(t);
              }}
            >
              {t}
            </a>
          ))}
        </nav>

        <div className="header-spacer" />

        <div className="search-box" role="search">
          <Icons.Search size={14} />
          <span>搜索文档、API、错误码…</span>
          <span className="kbd">⌘K</span>
        </div>

        <a className="console-link" href="#">
          控制台
          <Icons.ArrowUpRight size={13} />
        </a>
        <button className="icon-btn" aria-label="GitHub">
          <Icons.Github size={16} />
        </button>
      </div>
    </header>
  );
}
