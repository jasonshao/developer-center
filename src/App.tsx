import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader";
import { DocsSidebar, type SidebarSelection } from "./components/DocsSidebar";
import { HomePage } from "./pages/HomePage";
import { ScenarioPage } from "./pages/ScenarioPage";
import { DecisionTreePage } from "./pages/DecisionTreePage";
import { ApiIndexPage } from "./pages/ApiIndexPage";
import { BestPracticesPage } from "./pages/BestPracticesPage";
import { SupportPage } from "./pages/SupportPage";
import {
  DEFAULT_ITEM_BY_TAB,
  DEFAULT_MODULE_BY_TAB,
  SLUG_TO_TAB,
  TAB_TO_SLUG,
  type TabName,
  type TabSlug,
} from "./data/nav";
import { SCENARIO_BY_ID } from "./data/scenarios";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/:tab/*" element={<Shell />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function Shell() {
  const { tab: tabSlug = "home", "*": rest = "" } = useParams();
  const navigate = useNavigate();

  const slug: TabSlug = (SLUG_TO_TAB as Record<string, TabName>)[tabSlug]
    ? (tabSlug as TabSlug)
    : "home";
  const tab: TabName = SLUG_TO_TAB[slug];

  const [restModule, restItem] = useMemo(() => {
    const parts = rest.split("/").filter(Boolean);
    return [parts[0] || null, parts[1] || null] as [string | null, string | null];
  }, [rest]);

  const defaultItem = DEFAULT_ITEM_BY_TAB[tab];
  const defaultModule = DEFAULT_MODULE_BY_TAB[tab] || null;

  const [activeItem, setActiveItem] = useState<string>(restItem || defaultItem);
  const [activeModule, setActiveModule] = useState<string | null>(
    restModule || defaultModule
  );

  useEffect(() => {
    setActiveItem(restItem || DEFAULT_ITEM_BY_TAB[tab]);
    setActiveModule(restModule || DEFAULT_MODULE_BY_TAB[tab] || null);
  }, [slug, restItem, restModule, tab]);

  useEffect(() => {
    if (typeof window.scrollTo === "function") {
      try { window.scrollTo(0, 0); } catch {}
    }
  }, [slug, activeItem, activeModule]);

  const switchTab = (t: TabName) => {
    navigate(`/${TAB_TO_SLUG[t]}`);
  };

  const goDecisionTree = () => {
    navigate("/guides/guide-select/decision");
  };

  const goScenario = (scenarioId: string) => {
    const sc = SCENARIO_BY_ID[scenarioId];
    if (!sc) return;
    navigate(`/guides/${sc.moduleId}/${scenarioId}`);
  };

  const openCheckoutQuickstart = () => goScenario("sc-b2c");

  const selectModuleFromHome = (moduleId: string) => {
    // First scenario of that module = default landing
    const firstScenario = Object.values(SCENARIO_BY_ID).find((s) => s.moduleId === moduleId);
    if (firstScenario) {
      navigate(`/guides/${moduleId}/${firstScenario.id}`);
    }
  };

  const handleSidebarSelect = (sel: SidebarSelection) => {
    // Home tab: clicking a product module should jump into Guides tab's first scenario
    if (tab === "文档首页" && sel.moduleId) {
      selectModuleFromHome(sel.moduleId);
      return;
    }

    // Special: 场景选择器 entry
    if (sel.id === "guide-select") {
      goDecisionTree();
      return;
    }

    // Guides tab: reflect module & child in URL
    if (tab === "接入指南") {
      // If sel has moduleId from sidebar (clicking a scenario under a module)
      if (sel.moduleId) {
        navigate(`/guides/${sel.moduleId}/${sel.id}`);
        return;
      }
      // Linking at the "开始之前" level — single-segment URL
      navigate(`/guides/${sel.id}`);
      return;
    }

    // Other tabs: store item in URL as the only segment
    navigate(`/${TAB_TO_SLUG[tab]}/${sel.id}`);
  };

  const renderMain = () => {
    if (tab === "文档首页") {
      return (
        <HomePage
          onOpenRoute={openCheckoutQuickstart}
          onSelectModule={selectModuleFromHome}
          onOpenDecisionTree={goDecisionTree}
        />
      );
    }
    if (tab === "接入指南") {
      // Decision tree route
      if (restModule === "guide-select" || activeItem === "guide-select") {
        return <DecisionTreePage onPickScenario={goScenario} />;
      }
      // Scenario route
      const sid = activeItem;
      return <ScenarioPage scenarioId={sid} onBack={() => switchTab("文档首页")} />;
    }
    if (tab === "API 参考") return <ApiIndexPage />;
    if (tab === "最佳实践") return <BestPracticesPage />;
    if (tab === "支持") return <SupportPage />;
    return null;
  };

  return (
    <>
      <SiteHeader primaryTab={tab} onNav={switchTab} />
      <div className="shell">
        <DocsSidebar
          tab={tab}
          activeModule={activeModule}
          activeItem={activeItem}
          onSelect={handleSidebarSelect}
        />
        <main className="main">{renderMain()}</main>
      </div>
    </>
  );
}
