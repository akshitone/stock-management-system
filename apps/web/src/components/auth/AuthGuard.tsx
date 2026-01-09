"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { tokenManager } from "@/lib/api/auth.service";

interface AuthGuardProps {
  children: React.ReactNode;
}

// Public routes that don't require authentication
const publicRoutes = ["/login", "/register", "/forgot-password"];

/**
 * AuthGuard Component
 * Protects routes by redirecting unauthenticated users to login
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check for public routes
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
      return;
    }

    // Check if user is authenticated
    const isAuthenticated = tokenManager.isAuthenticated();

    if (!isAuthenticated) {
      // Store the attempted URL for redirect after login
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirectAfterLogin", pathname);
      }
      router.replace("/login");
    }
  }, [pathname, router]);

  // For public routes, render immediately
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return <>{children}</>;
  }

  // For protected routes, only render if authenticated
  const isAuthenticated = typeof window !== "undefined" && tokenManager.isAuthenticated();

  if (!isAuthenticated) {
    // Show loading or nothing while redirecting
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--section-color)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <i
            className="uil uil-spinner-alt"
            style={{
              fontSize: "32px",
              color: "var(--primary-color)",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ marginTop: "12px", color: "var(--sec-color)" }}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
