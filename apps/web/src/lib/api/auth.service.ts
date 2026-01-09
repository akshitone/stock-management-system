/**
 * Authentication API Service
 * Handles all API calls related to user authentication
 * Backend API: http://localhost:4000/api/auth
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ============================================================================
// Types
// ============================================================================
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  role?: "admin" | "user";
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLoginAt?: number;
  createdAt: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// ============================================================================
// Token Management
// ============================================================================
export const tokenManager = {
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  },

  setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  clearTokens(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  getUser(): AuthResponse["user"] | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser(user: AuthResponse["user"]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },
};

// ============================================================================
// Helper Functions
// ============================================================================
function getHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
  };
}

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = tokenManager.getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      message: "An unexpected error occurred",
      statusCode: response.status,
    }));
    throw error;
  }
  return response.json();
}

// ============================================================================
// Auth Service
// ============================================================================
export const authService = {
  /**
   * Login with email and password
   * POST /api/auth/login
   */
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });

    const data = await handleResponse<AuthResponse>(response);

    // Store tokens and user info
    tokenManager.setTokens(data.accessToken, data.refreshToken);
    tokenManager.setUser(data.user);

    return data;
  },

  /**
   * Register a new user
   * POST /api/auth/register
   */
  async register(userData: RegisterDto): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });

    const data = await handleResponse<AuthResponse>(response);

    // Store tokens and user info
    tokenManager.setTokens(data.accessToken, data.refreshToken);
    tokenManager.setUser(data.user);

    return data;
  },

  /**
   * Refresh access token
   * POST /api/auth/refresh
   */
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ refreshToken }),
    });

    const data = await handleResponse<AuthResponse>(response);

    // Update tokens
    tokenManager.setTokens(data.accessToken, data.refreshToken);
    tokenManager.setUser(data.user);

    return data;
  },

  /**
   * Get current user profile
   * GET /api/auth/me
   */
  async getProfile(): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    return handleResponse<UserProfile>(response);
  },

  /**
   * Logout - clears tokens and redirects to login
   */
  logout(): void {
    tokenManager.clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },
};
