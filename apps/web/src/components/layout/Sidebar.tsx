"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { navigationMenu, NavItem } from "@/lib/navigation";
import { useAuth } from "@/contexts/AuthContext";

// ============================================================================
// Sidebar Component
// ============================================================================
export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, isMobile, close } = useSidebar();
  const { user, logout, isAuthenticated } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Toggle submenu expansion
  const toggleExpand = useCallback((label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  }, []);

  // Check if a path is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Check if menu item has active child
  const hasActiveChild = (item: NavItem) => {
    if (!item.children) return false;
    return item.children.some((child) => isActive(child.href));
  };

  // Handle link click on mobile (close sidebar)
  const handleLinkClick = () => {
    if (isMobile) {
      close();
    }
  };

  // Determine sidebar classes
  const sidebarClasses = ["geex-sidebar", isOpen && isMobile ? "active" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="geex-sidebar-overlay"
          onClick={close}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 99,
          }}
        />
      )}

      <div
        className={sidebarClasses}
        style={isMobile && isOpen ? { display: "block", width: "310px" } : {}}
      >
        {/* Close Button (Mobile) */}
        <button className="geex-sidebar__close" onClick={close}>
          <i className="uil uil-times" />
        </button>

        <div className="geex-sidebar__wrapper">
          {/* Logo */}
          <div className="geex-sidebar__header">
            <Link href="/" className="geex-sidebar__logo" onClick={handleLinkClick}>
              <img className="logo-lite" src="/img/logo-dark.svg" alt="Stock Management" />
              <img className="logo-dark" src="/img/logo-lite.svg" alt="Stock Management" />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="geex-sidebar__menu-wrapper">
            <ul className="geex-sidebar__menu">
              {navigationMenu.map((item) => (
                <SidebarMenuItem
                  key={item.label}
                  item={item}
                  isActive={isActive}
                  hasActiveChild={hasActiveChild}
                  isExpanded={expandedItems.includes(item.label) || hasActiveChild(item)}
                  onToggle={() => toggleExpand(item.label)}
                  onLinkClick={handleLinkClick}
                />
              ))}
            </ul>
          </nav>

          {/* User Info & Logout */}
          {isAuthenticated && user && (
            <div style={{ padding: "16px 20px", borderTop: "1px solid var(--gray-color)" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: "var(--body-color)", fontSize: "14px" }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--sec-color)" }}>{user.email}</div>
                </div>
              </div>
              <button
                onClick={logout}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--danger-color)",
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "var(--danger-color)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <i className="uil uil-sign-out-alt" />
                Sign Out
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="geex-sidebar__footer">
            <span className="geex-sidebar__footer__title">Stock Management System</span>
            <p className="geex-sidebar__footer__copyright">© 2026 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// Sidebar Menu Item Component
// ============================================================================
interface SidebarMenuItemProps {
  item: NavItem;
  isActive: (href: string) => boolean;
  hasActiveChild: (item: NavItem) => boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}

function SidebarMenuItem({
  item,
  isActive,
  hasActiveChild,
  isExpanded,
  onToggle,
  onLinkClick,
}: SidebarMenuItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isItemActive = isActive(item.href) || hasActiveChild(item);

  if (hasChildren) {
    return (
      <li className={`geex-sidebar__menu__item has-children ${isExpanded ? "active" : ""}`}>
        <a
          href="#"
          className={`geex-sidebar__menu__link ${isItemActive ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
        >
          <i className={item.icon} />
          <span>{item.label}</span>
        </a>
        <ul className="geex-sidebar__submenu" style={{ display: isExpanded ? "block" : "none" }}>
          {item.children!.map((child) => (
            <li key={child.label} className="geex-sidebar__menu__item">
              <Link
                href={child.href}
                className={`geex-sidebar__menu__link ${isActive(child.href) ? "active" : ""}`}
                onClick={onLinkClick}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li className="geex-sidebar__menu__item">
      <Link
        href={item.href}
        className={`geex-sidebar__menu__link ${isActive(item.href) ? "active" : ""}`}
        onClick={onLinkClick}
      >
        <i className={item.icon} />
        <span>{item.label}</span>
      </Link>
    </li>
  );
}

export default Sidebar;
