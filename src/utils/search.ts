import { primaryRoutes } from "../data/routes";

export type SearchResult = {
  title: string;
  href: string;
  type: "route" | "direct-link";
  score: number;
};

export function searchRouteEntries(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  const routeResults = primaryRoutes.flatMap((route) => {
    const routeScore =
      route.title.toLowerCase().includes(normalized)
        ? 12
        : route.primaryKeywords.some((keyword) =>
              keyword.toLowerCase().includes(normalized)
            )
          ? 10
          : route.secondaryKeywords.some((keyword) =>
                keyword.toLowerCase().includes(normalized)
              )
            ? 4
            : route.shortDescription.toLowerCase().includes(normalized)
              ? 3
              : 0;

    const directLinkResults = route.directLinks
      .filter((link) => link.label.toLowerCase().includes(normalized))
      .map((link) => ({
        title: link.label,
        href: link.href,
        type: "direct-link" as const,
        score: 2
      }));

    const topRouteResult =
      routeScore > 0
        ? [
            {
              title: route.title,
              href: `/routes/${route.slug}`,
              type: "route" as const,
              score: routeScore
            }
          ]
        : [];

    return [...topRouteResult, ...directLinkResults];
  });

  return routeResults.sort((left, right) => right.score - left.score);
}
