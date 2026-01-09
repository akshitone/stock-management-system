"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService, type ApiError } from "@/lib/api/auth.service";
import { useToast } from "@/components/ui/Toast";

// ============================================================================
// Login Page
// ============================================================================
export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.login(formData);
      showToast(`Welcome back, ${response.user.name}!`, "success");

      // Redirect to the originally requested URL or default to quality page
      const redirectUrl =
        typeof window !== "undefined"
          ? sessionStorage.getItem("redirectAfterLogin") || "/masters/quality"
          : "/masters/quality";
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirectUrl);
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || "Invalid email or password");
      showToast(error.message || "Login failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "48px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Logo & Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <i className="uil uil-layers" style={{ fontSize: "32px", color: "white" }} />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#1a1a2e", margin: 0 }}>
            Stock Management System
          </h1>
          <p style={{ fontSize: "14px", color: "#6c757d", marginTop: "8px" }}>
            Sign in to your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: "12px 16px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid #EF4444",
              borderRadius: "10px",
              color: "#EF4444",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            <i className="uil uil-exclamation-triangle" style={{ marginRight: "8px" }} />
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                color: "#1a1a2e",
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <i
                className="uil uil-envelope"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6c757d",
                  fontSize: "18px",
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 44px",
                  borderRadius: "12px",
                  border: "1px solid #e0e0e0",
                  background: "#f8f9fa",
                  color: "#1a1a2e",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                color: "#1a1a2e",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <i
                className="uil uil-lock"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6c757d",
                  fontSize: "18px",
                }}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                minLength={6}
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 44px",
                  borderRadius: "12px",
                  border: "1px solid #e0e0e0",
                  background: "#f8f9fa",
                  color: "#1a1a2e",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            {isLoading ? (
              <>
                <i className="uil uil-spinner-alt" style={{ marginRight: "8px" }} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "#f8f9fa",
            borderRadius: "12px",
            fontSize: "13px",
            color: "#6c757d",
          }}
        >
          <strong style={{ color: "#1a1a2e" }}>Demo Credentials:</strong>
          <div style={{ marginTop: "8px" }}>
            Email:{" "}
            <code style={{ background: "#e9ecef", padding: "2px 6px", borderRadius: "4px" }}>
              admin@example.com
            </code>
          </div>
          <div style={{ marginTop: "4px" }}>
            Password:{" "}
            <code style={{ background: "#e9ecef", padding: "2px 6px", borderRadius: "4px" }}>
              admin123
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
