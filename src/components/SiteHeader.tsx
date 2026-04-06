import { Link, NavLink } from "react-router-dom";

const items = ["接入方案", "API 参考", "最佳实践", "更新日志", "支持与帮助"];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          收钱吧开发者
        </Link>
        <nav className="site-header__nav" aria-label="主导航">
          {items.map((item) => (
            <NavLink key={item} to="/" className="site-header__link">
              {item}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
