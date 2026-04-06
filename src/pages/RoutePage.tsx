import { Navigate, useParams } from "react-router-dom";
import { primaryRoutes } from "../data/routes";

export function RoutePage() {
  const { slug } = useParams();
  const route = primaryRoutes.find((entry) => entry.slug === slug);

  if (!route) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="section-block">
      <div className="container route-page">
        <div className="route-page__hero">
          <p className="route-page__eyebrow">{route.audience}</p>
          <h1>{route.title}</h1>
          <p>{route.shortDescription}</p>
        </div>

        <div className="route-page__layout">
          <article className="route-page__panel">
            <h2>Quickstart</h2>
            <ol className="route-page__steps">
              {route.quickstartSteps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>
          </article>

          <aside className="route-page__panel">
            <h2>相关入口</h2>
            <ul className="route-page__links">
              {route.directLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>

            <h3>代表场景</h3>
            <div className="route-card__chips">
              {route.primaryKeywords.map((keyword) => (
                <span key={keyword} className="chip">
                  {keyword}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
