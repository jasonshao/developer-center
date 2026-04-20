import { useEffect, useState } from "react";
import { Icons, type IconName } from "./icons";
import {
  NAV_BY_TAB,
  type NavItem,
  type NavModuleChild,
  type TabName,
} from "../data/nav";

export type SidebarSelection = {
  id: string;
  kind: "link" | "api" | "module-child";
  moduleId?: string;
  route?: boolean;
};

type Props = {
  tab: TabName;
  activeModule: string | null;
  activeItem: string;
  onSelect: (selection: SidebarSelection) => void;
};

export function DocsSidebar({ tab, activeModule, activeItem, onSelect }: Props) {
  const sections = NAV_BY_TAB[tab] || [];
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(
    activeModule ? { [activeModule]: true } : {}
  );

  useEffect(() => {
    if (activeModule) {
      setOpenModules((s) => ({ ...s, [activeModule]: true }));
    }
  }, [activeModule, tab]);

  const toggle = (id: string) =>
    setOpenModules((s) => ({ ...s, [id]: !s[id] }));

  const renderItem = (item: NavItem) => {
    if (item.kind === "link") {
      return (
        <div
          key={item.id}
          className={`sb-item ${activeItem === item.id ? "is-active" : ""}`}
          onClick={() =>
            onSelect({ id: item.id, kind: "link", moduleId: item.moduleId })
          }
        >
          {item.label}
        </div>
      );
    }
    if (item.kind === "api") {
      return (
        <div
          key={item.id}
          className={`sb-item sb-api ${activeItem === item.id ? "is-active" : ""}`}
          onClick={() => onSelect({ id: item.id, kind: "api" })}
        >
          <span className={`api-method m-${item.method.toLowerCase()}`}>
            {item.method}
          </span>
          <span className="api-path">{item.label}</span>
        </div>
      );
    }
    // module
    const open = !!openModules[item.id];
    return (
      <div key={item.id}>
        <div
          className={`sb-item sb-item-module ${open ? "is-open" : ""}`}
          onClick={() => toggle(item.id)}
        >
          {item.label}
          <span className="chev">
            <Icons.Chevron size={12} stroke={2} />
          </span>
        </div>
        {open && (
          <div className="sb-children">
            {item.children.map((child) => renderChild(item.id, child))}
          </div>
        )}
      </div>
    );
  };

  const renderChild = (moduleId: string, child: NavModuleChild) => {
    const ChildIcon = (Icons as Record<IconName, (p: { size?: number; stroke?: number }) => JSX.Element>)[
      child.icon
    ] || Icons.Dot;
    const isActive = activeItem === child.id;
    return (
      <div
        key={child.id}
        className={`sb-sub ${isActive ? "is-active" : ""}`}
        onClick={() =>
          onSelect({
            id: child.id,
            kind: "module-child",
            moduleId,
            route: child.route,
          })
        }
      >
        <span className="sub-icon">
          <ChildIcon size={13} stroke={1.6} />
        </span>
        {child.label}
      </div>
    );
  };

  return (
    <aside className="sidebar" aria-label="Documentation">
      <div className="sb-tab-label">{tab}</div>
      {sections.map((group) => (
        <div className="sb-section" key={group.group}>
          <div className="sb-group-label">{group.group}</div>
          {group.items.map((item) => renderItem(item))}
        </div>
      ))}
    </aside>
  );
}
