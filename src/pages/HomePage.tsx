import { Hero } from "../components/Hero";
import { RouteCard } from "../components/RouteCard";
import { QuickstartSteps } from "../components/QuickstartSteps";
import { DirectLinks } from "../components/DirectLinks";
import { primaryRoutes } from "../data/routes";

export function HomePage() {
  const handleStartClick = () => {
    document.getElementById("primary-routes")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <>
      <Hero onStartClick={handleStartClick} />

      <section className="section-block" id="primary-routes">
        <div className="container">
          <h2>第一步：选择接入路线</h2>
          <div className="route-grid">
            {primaryRoutes.map((route) => (
              <RouteCard key={route.slug} route={route} />
            ))}
          </div>
        </div>
      </section>

      <QuickstartSteps />
      <DirectLinks />
    </>
  );
}
