import { Link } from "react-router-dom";
import type { RouteEntry } from "../data/routes";

type RouteCardProps = {
  route: RouteEntry;
};

export function RouteCard({ route }: RouteCardProps) {
  return (
    <article className="route-card">
      <p className="route-card__audience">{route.audience}</p>
      <h3>{route.title}</h3>
      <p>{route.shortDescription}</p>
      <div className="route-card__chips" aria-label={`${route.title} 代表场景`}>
        {route.primaryKeywords.slice(0, 3).map((keyword) => (
          <span key={keyword} className="chip">
            {keyword}
          </span>
        ))}
      </div>
      <Link to={`/routes/${route.slug}`} className="route-card__link">
        查看 Quickstart
      </Link>
    </article>
  );
}
