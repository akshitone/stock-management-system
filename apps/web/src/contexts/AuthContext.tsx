"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, tokenManager, type AuthResponse } from "@/lib/api/auth.service";

// ============================================================================
// Types
// ============================================================================
interface AuthContextType {
  user: AuthResponse["user"] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// ============================================================================
// Context
// ============================================================================
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// ============================================================================
// Provider
// ============================================================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedUser = tokenManager.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await authService.login({ email, password });
    setUser(response.user);
    return response;
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  const refreshUser = async () => {
    try {
      const profile = await authService.getProfile();
      setUser({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
      });
    } catch {
      // If refresh fails, logout
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
