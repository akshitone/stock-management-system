"use client";

import { ToastProvider } from "@/components/ui/Toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";

/**
 * Client-side providers wrapper
 * Contains all context providers that require client-side rendering
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <AuthGuard>{children}</AuthGuard>
      </ToastProvider>
    </AuthProvider>
  );
}
