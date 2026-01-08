/**
 * Navigation menu configuration for Stock Management System
 * Based on the domain architecture from brainstorming document
 */

export interface NavItem {
  label: string;
  href: string;
  icon: string; // Unicons class name (e.g., 'uil-home')
  children?: NavItem[];
}

export const navigationMenu: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: "uil-home",
  },
  {
    label: "Masters",
    href: "/masters",
    icon: "uil-database",
    children: [
      { label: "Quality", href: "/masters/quality", icon: "uil-layer-group" },
      { label: "Factory", href: "/masters/factory", icon: "uil-building" },
      { label: "Worker", href: "/masters/worker", icon: "uil-user-square" },
      { label: "Machine", href: "/masters/machine", icon: "uil-cog" },
      { label: "Yarn", href: "/masters/yarn", icon: "uil-circle" },
    ],
  },
  {
    label: "Production",
    href: "/production",
    icon: "uil-process",
    children: [
      {
        label: "Beam Loading",
        href: "/production/beam-loading",
        icon: "uil-arrow-to-right",
      },
      {
        label: "Grey Production",
        href: "/production/grey-production",
        icon: "uil-file-plus",
      },
      {
        label: "Folding",
        href: "/production/folding",
        icon: "uil-layer-group",
      },
    ],
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: "uil-box",
    children: [
      {
        label: "Yarn Stock",
        href: "/inventory/yarn-stock",
        icon: "uil-circle",
      },
      {
        label: "Grey Stock",
        href: "/inventory/grey-stock",
        icon: "uil-file-blank",
      },
      {
        label: "Finished Goods",
        href: "/inventory/finished-goods",
        icon: "uil-package",
      },
    ],
  },
  {
    label: "Trading",
    href: "/trading",
    icon: "uil-exchange",
    children: [
      {
        label: "Sales Order",
        href: "/trading/sales-order",
        icon: "uil-clipboard-notes",
      },
      {
        label: "Sales Invoice",
        href: "/trading/sales-invoice",
        icon: "uil-invoice",
      },
      {
        label: "Purchase Bill",
        href: "/trading/purchase-bill",
        icon: "uil-receipt",
      },
    ],
  },
  {
    label: "Finance",
    href: "/finance",
    icon: "uil-money-bill",
    children: [
      {
        label: "Payment",
        href: "/finance/payment",
        icon: "uil-money-withdraw",
      },
      { label: "Receipt", href: "/finance/receipt", icon: "uil-money-insert" },
      { label: "Ledger", href: "/finance/ledger", icon: "uil-book-open" },
    ],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: "uil-chart-bar",
    children: [
      {
        label: "Worker Production",
        href: "/reports/worker-production",
        icon: "uil-user-check",
      },
      {
        label: "Salary Sheet",
        href: "/reports/salary-sheet",
        icon: "uil-file-check-alt",
      },
      { label: "Receivables", href: "/reports/receivables", icon: "uil-bill" },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "uil-setting",
  },
];
