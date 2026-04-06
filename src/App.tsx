import { Route, Routes } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { HomePage } from "./pages/HomePage";
import { RoutePage } from "./pages/RoutePage";

export default function App() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/routes/:slug" element={<RoutePage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
