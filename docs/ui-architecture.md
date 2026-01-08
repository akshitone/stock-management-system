# Stock Management System - Frontend Architecture Document

> **Version:** 1.0  
> **Created:** 2026-01-08  
> **Framework:** Next.js 14 (App Router) + Geex Template

---

## Table of Contents

1. [Template and Framework Selection](#1-template-and-framework-selection)
2. [Frontend Tech Stack](#2-frontend-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Component Standards](#4-component-standards)
5. [State Management](#5-state-management)
6. [API Integration](#6-api-integration)
7. [Routing](#7-routing)
8. [Styling Guidelines](#8-styling-guidelines)
9. [Testing Requirements](#9-testing-requirements)
10. [Environment Configuration](#10-environment-configuration)
11. [Developer Standards](#11-developer-standards)

---

## 1. Template and Framework Selection

### Framework

- **Next.js 14** with App Router (already installed)
- TypeScript for type safety

### Design Template

- **Geex Admin Dashboard** HTML template
- Located in `/html/` folder, assets copied to `/apps/web/public/`
- Contains: CSS (257KB), images, icons, Bootstrap grid, Unicons

### Conversion Approach

1. Use Geex CSS directly (loaded via `<link>` in layout)
2. Convert HTML structure to React components
3. Rewrite jQuery interactions in React (state + event handlers)

---

## 2. Frontend Tech Stack

| Category         | Technology                   | Version  | Purpose                                   |
| ---------------- | ---------------------------- | -------- | ----------------------------------------- |
| Framework        | Next.js (App Router)         | 14.x     | Full-stack React framework                |
| UI Library       | React                        | 18.2.x   | Component-based UI                        |
| State Management | React Context + useReducer   | Built-in | Global state (auth, theme, sidebar)       |
| Routing          | Next.js App Router           | 14.x     | File-based routing                        |
| Styling          | Geex CSS + CSS Modules       | N/A      | Template design + component-scoped styles |
| Form Handling    | React Hook Form              | 7.x      | Form state & validation                   |
| Icons            | Unicons                      | 4.x      | Icon library (CDN)                        |
| HTTP Client      | Fetch API                    | Built-in | API requests                              |
| Testing          | Jest + React Testing Library | 29.x     | Unit & integration tests                  |

---

## 3. Project Structure

```plaintext
apps/web/
├── public/                          # Static assets
│   ├── css/style.css               # Geex template CSS
│   ├── img/                        # Images
│   └── vendor/                     # Bootstrap CSS
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Auth pages (no sidebar)
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/            # Dashboard pages (with sidebar)
│   │   │   ├── layout.tsx          # Sidebar + Header layout
│   │   │   ├── page.tsx            # Dashboard home
│   │   │   ├── masters/            # Master data (quality, factory, etc.)
│   │   │   ├── production/         # Production tracking
│   │   │   ├── inventory/          # Stock management
│   │   │   ├── trading/            # Sales & Purchase
│   │   │   ├── finance/            # Payments & Receipts
│   │   │   ├── reports/            # Reports & Analytics
│   │   │   └── settings/
│   │   │
│   │   ├── globals.css
│   │   └── layout.tsx              # Root layout
│   │
│   ├── components/
│   │   ├── layout/                 # Header, Sidebar, Footer
│   │   ├── ui/                     # Button, Card, Modal, Table
│   │   ├── forms/                  # FormField, SelectField, BulkEntryGrid
│   │   └── shared/                 # QualitySelect, FactorySelect
│   │
│   ├── context/                    # AuthContext, ThemeContext, SidebarContext
│   ├── hooks/                      # useAuth, useTheme, useSidebar, useToast
│   ├── lib/
│   │   ├── api/                    # API client, services, endpoints
│   │   ├── utils/                  # formatters, validators, constants
│   │   └── config.ts
│   │
│   └── types/                      # models.ts, api.ts, forms.ts
```

---

## 4. Component Standards

### Component Template

```typescript
// PascalCase.tsx
"use client"; // Only if using hooks/state/events

import { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
  className?: string;
}

export function Component({ children, className = "" }: ComponentProps) {
  return <div className={`geex-component ${className}`}>{children}</div>;
}
```

### Naming Conventions

| Type             | Convention                  | Example              |
| ---------------- | --------------------------- | -------------------- |
| Components       | PascalCase                  | `QualityList.tsx`    |
| Hooks            | camelCase with `use` prefix | `useAuth.ts`         |
| Services         | kebab-case with `.service`  | `quality.service.ts` |
| Types/Interfaces | PascalCase                  | `QualityFormData`    |
| CSS Classes      | BEM (Geex pattern)          | `geex-card__header`  |

---

## 5. State Management

### Context Pattern

```typescript
// src/context/SidebarContext.tsx
"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";

interface SidebarState {
  isOpen: boolean;
}

type SidebarAction = { type: "TOGGLE" } | { type: "OPEN" } | { type: "CLOSE" };

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sidebarReducer, { isOpen: true });

  const toggle = useCallback(() => dispatch({ type: "TOGGLE" }), []);

  return (
    <SidebarContext.Provider value={{ ...state, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}
```

### Contexts to Create

- `AuthContext` — User authentication state
- `SidebarContext` — Sidebar open/close
- `ThemeContext` — Dark/light mode
- `ToastContext` — Toast notifications

---

## 6. API Integration

### API Client

```typescript
// src/lib/api/client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class ApiClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params)
      Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const response = await fetch(url.toString(), {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  // ... patch, delete methods
}

export const api = new ApiClient();
```

### Service Pattern

```typescript
// src/lib/api/services/quality.service.ts
import { api } from "../client";

export const qualityService = {
  getAll: (filters?: QualityFilters) =>
    api.get<PaginatedResponse<Quality>>("/masters/quality", filters),
  getById: (id: string) =>
    api.get<ApiResponse<Quality>>(`/masters/quality/${id}`),
  create: (data: CreateQualityDto) =>
    api.post<ApiResponse<Quality>>("/masters/quality", data),
  update: (id: string, data: UpdateQualityDto) =>
    api.patch<ApiResponse<Quality>>(`/masters/quality/${id}`, data),
  delete: (id: string) =>
    api.delete<ApiResponse<void>>(`/masters/quality/${id}`),
};
```

---

## 7. Routing

### Route Groups

| Group         | Path                    | Layout                  | Purpose              |
| ------------- | ----------------------- | ----------------------- | -------------------- |
| `(auth)`      | `/login`, `/signup`     | Minimal (no sidebar)    | Authentication pages |
| `(dashboard)` | `/`, `/masters/*`, etc. | Full (sidebar + header) | Main application     |

### Protected Routes Middleware

```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const publicPaths = ["/login", "/signup", "/forgot-password"];
  const token = request.cookies.get("token")?.value;

  if (!publicPaths.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```

### Navigation Menu

```typescript
// src/lib/navigation.ts
export const navigationMenu = [
  { label: 'Dashboard', href: '/', icon: 'uil-home' },
  { label: 'Masters', href: '/masters', icon: 'uil-database', children: [
    { label: 'Quality', href: '/masters/quality' },
    { label: 'Factory', href: '/masters/factory' },
    // ...
  ]},
  { label: 'Production', href: '/production', icon: 'uil-process', children: [...] },
  { label: 'Inventory', href: '/inventory', icon: 'uil-box', children: [...] },
  { label: 'Trading', href: '/trading', icon: 'uil-exchange', children: [...] },
  { label: 'Finance', href: '/finance', icon: 'uil-money-bill', children: [...] },
  { label: 'Reports', href: '/reports', icon: 'uil-chart-bar', children: [...] },
];
```

---

## 8. Styling Guidelines

### CSS Strategy

1. **Geex CSS** — Primary styling (loaded in root layout)
2. **CSS Modules** — Component-specific overrides only
3. **Inline Styles** — Only for dynamic/calculated values

### CSS Variables (from Geex)

```css
:root {
  --primary-color: #ab54db;
  --success-color: #2cbf44;
  --warning-color: #fdb23a;
  --danger-color: #ff5653;
  --body-color: #464255;
  --section-color: #f5f4fa;
  --white-color: #ffffff;
}

[data-theme="dark"] {
  --section-color: #1a1825;
  --white-color: #2f2a36;
  --body-color: #d0d6de;
}
```

### Common Geex Classes

| Category | Classes                                                          |
| -------- | ---------------------------------------------------------------- |
| Layout   | `geex-dashboard`, `geex-main-content`, `geex-content`            |
| Sidebar  | `geex-sidebar`, `geex-sidebar__menu`, `geex-sidebar__menu__link` |
| Cards    | `geex-card`, `geex-card__header`, `geex-card__body`              |
| Buttons  | `geex-btn`, `geex-btn--primary`, `geex-btn--outline`             |
| Forms    | `geex-form__input`, `geex-form__label`, `geex-form__group`       |
| Tables   | `geex-table`, `geex-table__head`, `geex-table__body`             |

---

## 9. Testing Requirements

### Test Tools

- **Jest** — Test runner
- **React Testing Library** — Component testing
- **Playwright** (future) — E2E testing

### Test Patterns

```typescript
// Component test
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Coverage Goals

- **Business Logic:** 80%
- **UI Components:** 60%
- **Critical Paths:** 100%

---

## 10. Environment Configuration

### .env.local

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME="Stock Management System"
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

### Config Utility

```typescript
// src/lib/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Stock Management System",
  isDevelopment: process.env.NODE_ENV === "development",
} as const;
```

---

## 11. Developer Standards

### Critical Rules

| #   | Rule                                                         |
| --- | ------------------------------------------------------------ |
| 1   | Never use `any` type — use proper types or `unknown`         |
| 2   | Always use `'use client'` explicitly for client components   |
| 3   | Use Geex CSS classes — inline styles only for dynamic values |
| 4   | Always handle loading and error states                       |
| 5   | API calls go in service files, not components                |
| 6   | Use `Link` from `next/link` for navigation                   |
| 7   | Forms use React Hook Form                                    |
| 8   | Test before commit                                           |

### Quick Reference

```plaintext
# Commands
npm run dev          # Dev server (port 3000)
npm run build        # Production build
npm test             # Run tests

# Import Patterns
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { qualityService } from '@/lib/api/services/quality.service';
import { config } from '@/lib/config';
import type { Quality } from '@/types/models';

# File Naming
Components:   PascalCase.tsx      → Button.tsx
Hooks:        camelCase.ts        → useAuth.ts
Services:     kebab.service.ts    → quality.service.ts
Tests:        *.test.tsx          → Button.test.tsx
```

---

## Change Log

| Date       | Version | Description                   | Author              |
| ---------- | ------- | ----------------------------- | ------------------- |
| 2026-01-08 | 1.0     | Initial architecture document | Winston (Architect) |
